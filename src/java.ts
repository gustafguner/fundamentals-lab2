import { commands } from './config';
import * as shell from 'shelljs';
import to from 'await-to-js';

const lang = commands.java.fileExtension;
const compileCommand = commands.java.compile;
const testCommand = commands.java.test;

const compileCode = async (path: string) => {
  return new Promise((resolve, reject) => {
    shell.exec(
      `${compileCommand} ${path}/*.${lang}`,
      (code, stdout, stderr) => {
        if (stderr.length !== 0) {
          resolve({
            success: false,
            type: 'compilation',
            message: stderr,
          });
        } else {
          resolve({ success: true, message: stdout });
        }
      },
    );
  });
};

const testCode = async (path: string, testFiles: string[]) => {
  const failingTestFiles: string[] = [];

  const cdPromise = () => {
    return new Promise((resolve, reject) => {
      shell.exec('pwd', (code, stdout, stderr) => {
        resolve(stdout);
      });
    });
  };
  const [cdErr, cdOut] = await to(cdPromise());
  return new Promise(async (resolve, reject) => {
    shell.cd(path);

    const promises = [];

    testFiles.forEach((file, i) => {
      const promise = new Promise((resolveInner, rejectInner) => {
        shell.exec(`${testCommand} ${file}`, (code, stdout, stderr) => {
          const lines = stdout.split('\n');
          const statusLine = lines[lines.length - 3];

          if (statusLine.substring(0, 2) !== 'OK' || stderr.length !== 0) {
            failingTestFiles.push(file);
          }
          resolveInner();
        });
      });
      promises.push(promise);
    });

    Promise.all(promises)
      .then(() => {
        shell.cd(cdOut as string);
        if (failingTestFiles.length !== 0) {
          let message = `Error: ${failingTestFiles.length}/${
            testFiles.length
          } test files failed. \n The following tests failed:\n`;

          failingTestFiles.forEach((file) => {
            message += `${file}\n`;
          });

          resolve({
            success: false,
            type: 'test',
            message,
          });
        } else {
          resolve({
            success: true,
            message: 'All test files succeeded!',
          });
        }
      })
      .catch(() => {
        reject();
      });
  });
};

const compileAndTest = async (buildPath: string, testFiles: string[]) => {
  let err;
  let output;

  [err, output] = await to(compileCode(buildPath));

  if (output.success === false) {
    return output;
  }

  [err, output] = await to(testCode(buildPath, testFiles));

  return output;
};

export { compileCode, testCode, compileAndTest };
