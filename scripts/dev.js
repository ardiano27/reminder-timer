const { spawn } = require('child_process');
const net = require('net');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const npmCommand = 'npm';
const children = [];
let shuttingDown = false;

function shutdown(exitCode = 0) {
  if (shuttingDown) {
    return;
  }

  shuttingDown = true;

  for (const child of children) {
    if (!child.killed) {
      child.kill();
    }
  }

  setTimeout(() => process.exit(exitCode), 300);
}

function startProcess(label, command, args, cwd) {
  const child = spawn(command, args, {
    cwd,
    stdio: 'inherit',
    shell: true,
  });

  child.on('exit', (code, signal) => {
    if (shuttingDown) {
      return;
    }

    const exitCode = typeof code === 'number' ? code : 1;
    const reason = signal ? `${label} stopped with ${signal}` : `${label} exited with code ${exitCode}`;
    console.error(reason);
    shutdown(exitCode);
  });

  child.on('error', (error) => {
    if (shuttingDown) {
      return;
    }

    console.error(`${label} failed to start:`, error);
    shutdown(1);
  });

  children.push(child);
  return child;
}

function isPortOpen(port) {
  return new Promise((resolve) => {
    const socket = net.createConnection({ port, host: '127.0.0.1' });

    socket.once('connect', () => {
      socket.end();
      resolve(true);
    });

    socket.once('error', () => {
      resolve(false);
    });

    socket.setTimeout(1000, () => {
      socket.destroy();
      resolve(false);
    });
  });
}

async function main() {
  startProcess('client', npmCommand, ['run', 'start:client'], rootDir);

  const serverAlreadyRunning = await isPortOpen(4000);
  if (serverAlreadyRunning) {
    console.log('Server sudah aktif di http://localhost:4000, jadi aku lanjutkan client saja.');
    return;
  }

  startProcess('server', npmCommand, ['--prefix', 'server', 'start'], rootDir);
}

main().catch((error) => {
  console.error('Dev launcher failed:', error);
  shutdown(1);
});

process.on('SIGINT', () => shutdown(0));
process.on('SIGTERM', () => shutdown(0));
