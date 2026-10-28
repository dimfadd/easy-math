// English translation · Grade 1 · Chapter 6: Addition and Subtraction to 20
// Indices follow content/k1/b6.js. Stage text here is numbers only, so no `els` are needed.

export const LESSONS = {
  'k1b6-1': {
    full: true,
    chapters: [
      {
        title: 'Have a guess',
        steps: [
          {
            say: 'There are 8 red dots and 5 blue dots. How many are there altogether?',
            ask: {
              options: [
                { why: 'Move 2 blue dots to fill the top frame: 10. There are 3 blue left. 10 and 3 make 13.' },
                { why: 'Count the blue dots left after the top frame is full again: there are 3.' },
                { why: '3 is the difference. Adding means putting together.' },
                { why: '8 add 5 is not written 85. Put the objects together.' },
              ],
            },
          },
        ],
      },
      {
        title: 'Fill the ten frame',
        steps: [
          { say: 'There are 8 red dots in the top frame. There are still 2 empty boxes.' },
          { say: 'Move 2 blue dots up. The top frame is full: 10.' },
          { say: 'There are 3 left at the bottom. 10 and 3 make 13.' },
        ],
      },
      {
        title: 'The steps',
        steps: [{ say: 'Split 5 into 2 and 3. Use 2 to make 10, then add the 3 that are left.' }],
      },
      {
        title: 'Your turn',
        steps: [
          {
            say: 'Your turn. What is 9 add 4?',
            ask: {
              options: [
                { why: '9 + 1 = 10, with 3 left. 10 + 3 = 13.' },
                { why: 'After moving 1, there are only 3 blue left.' },
                { why: '5 is the difference.' },
                { why: '10 and 3 make 13.' },
              ],
            },
          },
          { say: 'Move 1 blue dot up. The top frame has 10, with 3 left. So it is 13.' },
        ],
      },
    ],
    quiz: [
      { wrong: { '6': 'That is 9 take away 3.', '11': '9 + 1 = 10, with 2 left. 10 + 2 = 12.' }, steps: ['9 + 1 = 10, with 2 left.', '10 + 2 = 12.'] },
      { wrong: { '2': 'That is the difference.', '13': '8 + 2 = 10, with 4 left. 10 + 4 = 14.' }, steps: ['8 + 2 = 10, with 4 left.', '10 + 4 = 14.'] },
      { wrong: { '11': '7 + 3 = 10, with 2 left. 10 + 2 = 12.' }, steps: ['7 + 3 = 10, with 2 left.', '10 + 2 = 12.'] },
      { wrong: { '3': 'That is 10 take away 7.', '107': '10 and 7 make 17.' }, steps: ['10 and 7.', '= 17.'] },
      {
        q: 'Ani has 6 marbles. She buys 8 more marbles. Now Ani has …',
        wrong: { '2': 'Buying more means the number goes up.', '13': '8 + 2 = 10, with 4 left. 10 + 4 = 14.' },
        steps: ['6 + 8 = 8 + 6.', '8 + 2 + 4 = 14.'],
      },
    ],
  },

  'k1b6-2': {
    full: true,
    chapters: [
      {
        title: 'Have a guess',
        steps: [
          {
            say: 'There are 13 dots. 5 are taken away. How many are left?',
            ask: {
              options: [
                { why: 'Take away 3 first to leave 10. Take away 2 more to leave 8.' },
                { why: '18 is 13 + 5. Taking away makes it smaller.' },
                { why: 'From 10, take away 2 more: 8 are left.' },
                { why: 'Only 3 have been taken so far. You still need to take away 2 more.' },
              ],
            },
          },
        ],
      },
      {
        title: 'Take away down to 10 first',
        steps: [
          { say: 'There are 13: 10 at the top and 3 at the bottom. We are going to take away 5.' },
          { say: 'Take away the 3 at the bottom first. 10 are left.' },
          { say: 'We still need to take away 2 more. Take 2 from the top frame. 8 are left.' },
        ],
      },
      {
        title: 'The steps',
        steps: [{ say: 'Split 5 into 3 and 2. Take away 3 first to get down to 10, then take away 2 more.' }],
      },
      {
        title: 'Your turn',
        steps: [
          {
            say: 'Your turn. What is 12 take away 4?',
            ask: {
              options: [
                { why: '12 − 2 = 10, then 10 − 2 = 8.' },
                { why: '16 is 12 + 4.' },
                { why: 'From 10, take away 2 more: 8.' },
                { why: 'Only 2 have been taken. Take away 2 more.' },
              ],
            },
          },
          { say: 'Take away the 2 at the bottom to leave 10. Take 2 more from the top to leave 8.' },
        ],
      },
    ],
    quiz: [
      { wrong: { '20': 'That is 14 + 6.', '10': 'That is only 14 − 4. Take away 2 more.' }, steps: ['14 − 4 = 10.', '10 − 2 = 8.'] },
      { wrong: { '14': 'That is 11 + 3.', '9': '11 − 1 = 10, then 10 − 2 = 8.' }, steps: ['11 − 1 = 10.', '10 − 2 = 8.'] },
      { wrong: { '20': 'That is 15 + 5.' }, steps: ['Take away the 5 at the bottom.', '10 are left.'] },
      { wrong: { '24': 'That is 17 + 7.', '7': '17 is 10 and 7. Take away 7 to leave 10.' }, steps: ['17 = 10 and 7.', 'Take away 7 to leave 10.'] },
      {
        q: 'There are 16 cakes. 9 cakes are eaten. The number of cakes left is …',
        wrong: { '25': 'Eating them means there are fewer.', '9': '9 is the number of cakes eaten.' },
        steps: ['16 − 6 = 10.', '10 − 3 = 7.'],
      },
    ],
  },
};

export const BAB_EXTRA = {
  k1b6: [
    { wrong: { '1': 'That is the difference.', '12': '7 + 3 = 10, with 3 left. 10 + 3 = 13.' }, steps: ['7 + 3 = 10, with 3 left.', '10 + 3 = 13.'] },
    { wrong: { '21': 'That is 13 + 8.', '6': '13 − 3 = 10, then 10 − 5 = 5.' }, steps: ['13 − 3 = 10.', '10 − 5 = 5.'] },
    {
      q: 'There are 9 boys and 8 girls in the class. There are … children altogether.',
      wrong: { '1': 'Altogether means adding.', '16': '9 + 1 = 10, with 7 left. 10 + 7 = 17.' },
      steps: ['9 + 1 = 10, with 7 left.', '10 + 7 = 17.'],
    },
  ],
};
