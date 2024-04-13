#! /usr/bin/env node
import inquirer from 'inquirer';
import chalk from "chalk";
import chalkAnimation from 'chalk-animation';
const sleep = () => {
    return new Promise((res) => {
        setTimeout(res, 3000);
    });
};
async function welcome() {
    let rainbowTitle = chalkAnimation.rainbow(`\t\t ______________________________________
                |   Welcome To Currency Convertor App  |
                |______________________________________|`); // Animation starts
    await sleep();
    rainbowTitle.stop();
}
await welcome();
async function askQuestion() {
    const currency = {
        USD: 1, // base currency
        EUR: 0.94,
        CAD: 1.37,
        SAR: 3.75,
        GBP: 0.80,
        INR: 83.39,
        PKR: 277.52
    };
    let userAns = await inquirer.prompt([{
            name: "from",
            type: "list",
            message: "Enter from Currency : ",
            choices: ["USD", "EUR", "CAD", "SAR", "GBP", "INR", "PKR"]
        },
        {
            name: 'to',
            message: "Enter to Currency",
            type: "list",
            choices: ["USD", "EUR", "CAD", "SAR", "GBP", "INR", "PKR"]
        },
        {
            name: "amount",
            message: "Enter your amount ",
            type: 'number'
        }
    ]);
    let from = currency[userAns.from];
    let to = currency[userAns.to];
    let amount = userAns.amount;
    let baseAmount = amount / from;
    let convertedAmount = baseAmount * to;
    let roundedNum = Math.round(convertedAmount * 100) / 100;
    console.log(chalk.rgb(255, 112, 166).bold(`\n${amount} ${userAns.from} = \n ${roundedNum} ${userAns.to}`));
}
do {
    await askQuestion();
    var again = await inquirer
        .prompt({
        type: "input",
        name: "restart",
        message: "Do you want to continue? Press y: "
    });
    console.log("\n");
} while (again.restart == 'y' || again.restart == 'Y' || again.restart == 'yes' || again.restart == 'YES');
