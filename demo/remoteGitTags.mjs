// ?. 可选链操作符
// const aaa = undefined;
// console.log(aaa?.toString());
// const bbb = null;
// console.log(bbb?.toString());
// const ccc = 123;
// console.log(ccc?.toString());

// 引入remoteGitTags函数
// import remoteGitTags from 'remote-git-tags';
// console.log('remoteGitTags', remoteGitTags)

import { promisify } from 'node:util';
import childProcess from 'node:child_process';
// console.log('promisify:\n', promisify.toString());
// console.log('childProcess:\n', childProcess);
// console.log('childProcess:\n', childProcess.execFile.toString());

const execFile = promisify(childProcess.execFile);

export default async function remoteGitTags(repoUrl) {
  const res = await execFile('git', ['ls-remote', '--tags', repoUrl]);
  console.log('res \n:', res);
  const { stdout } = res;
  const tags = new Map();

  for (const line of stdout.trim().split('\n')) {
    console.log('line', line)
    const [hash, tagReference] = line.split('\t');
    console.log('hash', hash)
    console.log('tagReference', tagReference)
    // Strip off the indicator of dereferenced tags so we can override the
    // previous entry which points at the tag hash and not the commit hash
    // `refs/tags/v9.6.0^{}` → `v9.6.0`
    const tagName = tagReference.replace(/^refs\/tags\//, '').replace(/\^{}$/, '');
    console.log('tagName', tagName)
    tags.set(tagName, hash);
  }

  return tags;
}

const res = await remoteGitTags('https://github.com/x-extends/vxe-table-plugin-charts');
console.log('res:', res);
