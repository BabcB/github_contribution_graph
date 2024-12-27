import jsonfile from 'jsonfile';
import moment from 'moment';
import simpleGit from 'simple-git';
import pattern from './pattern.json' assert { type: 'json' };

const path = './data.json';

const makeCommits = (n) => {
  if (n === 0) return simpleGit().push();
  const x = pattern[pattern.length - n].x;
  const y = pattern[pattern.length - n].y;
  const date = moment()
    .subtract(1, 'y')
    .add(1, 'd')
    .add(x, 'w')
    .add(y, 'd')
    .format();

  console.log(date);
  jsonfile.writeFile(path, { date }, () => {
    simpleGit()
      .add([path])
      .commit(date, { '--date': date }, makeCommits.bind(this, --n));
  });
};

makeCommits(pattern.length);
