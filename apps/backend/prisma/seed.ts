import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.problem.createMany({
    data: [
      {
        title: 'Sum of Two Numbers',
        description: 'Given two integers, return their sum.',
        input: '2 3',
        output: '5',
        difficulty: 'easy',
      },
      {
        title: 'Palindrome Check',
        description: 'Check if a string is a palindrome.',
        input: 'racecar',
        output: 'true',
        difficulty: 'medium',
      },
    ]
  });
  console.log('Problems seeded!');
}

main()
  .then(() => prisma.$disconnect())
  .catch(err => {
    console.error(err);
    prisma.$disconnect();
  });
