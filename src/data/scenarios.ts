export const scenarios: Record<string, any[]> = {
  home: [
    // ACTIVE: Budgeting - Welcome to Your First Paycheck - Multi-page scenario
    {
      title: "💰 Budgeting -- Welcome to Your First Paycheck!",
      isMultiPage: true,
      pages: [
        {
          type: "intro",
          content: {
            title:
              "💰 Budgeting -- Welcome to Your First Paycheck!",
            storyIntro:
              "You just got paid! Before you sprint to the nearest Prisma, Alko, or online shopping cart… let's learn how to make your money actually last until next payday.",
          },
        },
        {
          type: "lesson",
          content: {
            title: "The 50–30–20 Budget Rule",
            description:
              "When money comes in, divide your monthly income into:",
            sections: [
              {
                title: "50% – Needs",
                subtitle: "Things you must pay to live:",
                items: [
                  "Rent or shared-flat contribution",
                  "Groceries",
                  "Public transport card",
                  "Phone bill",
                  "Healthcare expenses",
                  "Loan payments",
                ],
              },
              {
                title: "30% – Wants",
                subtitle: "Fun money:",
                items: [
                  "Eating out",
                  "Cinema",
                  "Gaming subscriptions",
                  "Parties",
                  "Clothing",
                  "Hobbies",
                ],
              },
              {
                title: "20% – Future You",
                subtitle: "Long-term stability:",
                items: [
                  "Savings",
                  "Emergency fund (broken phone, surprise healthcare bill)",
                  "Investments (if unlocked later)",
                ],
              },
            ],
          },
        },
        {
          type: "importance",
          content: {
            title: "Why it matters",
            text: "If you don't plan your paycheck, your paycheck will plan you. Unexpected expenses come fast, especially in Finland (hello, 100€ healthcare deductible!). Budgeting = less stress + more control + more freedom.",
          },
        },
        {
          type: "task",
          content: {
            title: "Your Task",
            description:
              'Create your first monthly budget. You\'ll be given: Your paycheck, Your fixed monthly expenses, A wishlist of "wants", A savings goal based on your storyline path.',
            choices: [
              {
                text: "A) Don't budget and spend it all in stuff.",
                happinessChange: 10,
                safetyChange: -25,
                result:
                  "You spent everything on fun stuff! It felt great... for a week. Then your phone bill came due and you had no money left. You had to skip meals and ask friends for help. The stress was overwhelming.",
                tip: "You don't have to be perfect. You just have to be aware. Your future events will respond to how well you manage your money.",
              },
              {
                text: "B) Do a functional budget.",
                happinessChange: -5,
                safetyChange: 30,
                result:
                  "You created a budget using the 50-30-20 rule. It felt restrictive at first, but by the end of the month, all your bills were paid, you had fun money left, and you even started an emergency fund. You felt in control!",
                tip: "You don't have to be perfect. You just have to be aware. Your future events will respond to how well you manage your money.",
              },
            ],
          },
        },
      ],
      educationalNote:
        "The 50-30-20 rule helps you balance living today with preparing for tomorrow.",
    },
  ],

  bank: [
    // ACTIVE: Swipe, Save, or Spill? - Multi-page scenario
    {
      title: "💳 Swipe, Save, or Spill?",
      isMultiPage: true,
      pages: [
        {
          type: "intro",
          content: {
            title: "💳 Swipe, Save, or Spill?",
            storyIntro:
              "Your first credit card offer arrived, and an investment opportunity popped up online. How will you use these tools wisely?",
          },
        },
        {
          type: "lesson",
          content: {
            title: "Credit Cards & Investments",
            description:
              "Credit cards let you borrow money to buy things now and pay later. Using them responsibly builds a good credit history, but unpaid balances charge interest. Investments let your money grow over time through stocks, funds, or savings accounts. Their value can go up or down, so there's a risk of losing money. Both tools can help you manage and grow your money if used wisely.",
          },
        },
        {
          type: "importance",
          content: {
            title: "Why it matters",
            text: "Overspending on credit cards or paying only the minimum can lead to high-interest debt and hurt your credit score. Investing without understanding the risks can make you lose money, especially if emergency savings are used.",
          },
        },
        {
          type: "task",
          content: {
            title: "Your task",
            description:
              "Decide how much you'll spend with a credit card and how much to invest this month. Watch the long-term impact on your budget and goals.",
            choices: [
              {
                text: "A) I will use my credit card in everything! Who cares responsibility?",
                moneyChange: -200,
                happinessChange: 15,
                safetyChange: -35,
                anxietyChange: 25,
                result:
                  "You used your credit card for everything without tracking your spending! The interest piled up quickly, and you struggled to pay it off. You ended up with €200 in debt and a damaged credit score. The stress was overwhelming.",
                tip: "Use credit cards only for purchases you can repay on time. Track your spending. Start investing with small amounts, focus on long-term growth, and keep your emergency fund separate from investments.",
              },
              {
                text: "B) I will use credit card with great responsibility.",
                moneyChange: 100,
                happinessChange: -5,
                safetyChange: 30,
                anxietyChange: -15,
                result:
                  "You used your credit card responsibly, only for planned purchases you could pay back immediately. You also invested €100 in a long-term fund after keeping your emergency savings separate. You felt confident and in control of your financial future!",
                tip: "Use credit cards only for purchases you can repay on time. Track your spending. Start investing with small amounts, focus on long-term growth, and keep your emergency fund separate from investments.",
              },
            ],
          },
        },
      ],
      educationalNote:
        "Credit cards and investments are powerful tools when used responsibly. Always pay your credit card balance on time and invest only money you can afford to lose.",
    },
  ],

  mall: [],

  hospital: [
    // ACTIVE: Save for Whoopsies & Wishlist - Multi-page scenario
    {
      title: "Save for Whoopsies & Wishlist",
      isMultiPage: true,
      pages: [
        {
          type: "intro",
          content: {
            title: "Save for Whoopsies & Wishlist",
            storyIntro:
              "Life is full of surprises and planned expenses. Will you have money ready when things happen?",
          },
        },
        {
          type: "lesson",
          content: {
            title: "Emergency Fund vs Sinking Fund",
            description:
              "Understanding the difference between these two types of savings is essential for financial security.",
            microExamples: [
              "An emergency fund is money saved for unexpected events like illness, job loss, or urgent repairs.",
              "A sinking fund is money saved bit by bit for planned expenses, such as holidays, birthdays, or buying gadgets.",
              "Emergencies are surprises, while sinking funds are planned.",
            ],
            macroExamples: [
              "Keeping both separate ensures that money for planned things isn't used for emergencies.",
              "Emergency money isn't spent on planned goals.",
              "Over time, this helps you feel confident and secure with your finances.",
            ],
          },
        },
        {
          type: "importance",
          content: {
            title: "Why it matters",
            text: "Using your emergency fund for non-urgent or planned expenses can leave you unprepared for real emergencies. Borrowing from sinking funds for impulse purchases can derail savings and create last-minute stress.",
          },
        },
        {
          type: "task",
          content: {
            title: "Your task",
            description:
              "Set up your emergency fund and one or two sinking funds. Decide how much to allocate to each and track your progress for the next in-game month.",
            choices: [
              {
                text: "I don't care about sinking funds. It's so unnecessary.",
                moneyChange: 0,
                happinessChange: 10,
                safetyChange: -30,
                anxietyChange: 20,
                result:
                  "You decided to skip setting up sinking funds. While you feel free now, unexpected planned expenses might catch you off guard later, forcing you to dip into emergency savings or go into debt.",
                tip: "Keep emergency and sinking funds in different places. Save a little each week and check your progress. This makes it easier to reach your goals without stress.",
              },
              {
                text: "Future is unpredictable. Better to be prepared than sorry.",
                moneyChange: 0,
                happinessChange: 5,
                safetyChange: 40,
                anxietyChange: -20,
                result:
                  "You set up both emergency and sinking funds wisely! You allocated money for unexpected events and planned expenses. This preparation gives you financial confidence and reduces stress about the future.",
                tip: "Keep emergency and sinking funds in different places. Save a little each week and check your progress. This makes it easier to reach your goals without stress.",
              },
            ],
          },
        },
      ],
      educationalNote:
        "Separating emergency and sinking funds helps you stay prepared for both surprises and planned expenses.",
    },
  ],

  casino: [
    // ACTIVE: When Life Throws You Lemon - Multi-page scenario
    {
      title: "🍋 When life throws you lemon...",
      isMultiPage: true,
      pages: [
        {
          type: "intro",
          content: {
            title: "🍋 When life throws you lemon...",
            storyIntro:
              "Oh no! Life throws surprises at you. Your phone breaks, bills rise, and sometimes prices across the country suddenly increase. Can you stay on top of your budget?",
          },
        },
        {
          type: "lesson",
          content: {
            title: "Lesson – Unexpected Costs",
            description:
              "Unexpected costs are expenses that come up suddenly and weren't planned. They can happen at:",
            microExamples: [
              "Your phone or laptop breaks and needs repair.",
              "A school trip or hobby activity costs more than expected.",
              "Unplanned medical bills or medications.",
              "Friends or family ask for help unexpectedly.",
            ],
            macroExamples: [
              "Prices of everyday goods rise (inflation).",
              "Taxes or fees increase.",
              "New laws or regulations add costs (e.g., environmental taxes).",
              "Economic events like recessions make goods more expensive.",
            ],
          },
        },
        {
          type: "importance",
          content: {
            title: "Why this matters",
            text: "Unexpected costs can make it hard to stick to your budget. If you're not prepared, you may have to borrow money, skip planned goals, or reduce spending on important things. Without savings or a plan, unexpected costs can force you to borrow money or skip important purchases. Rising prices at the macro level make everything more expensive, even things you buy every week.",
          },
        },
        {
          type: "task",
          content: {
            title: "Your Task",
            description:
              'Adjust your monthly budget to include an "unexpected costs" buffer. Decide how much to save for micro surprises and macro-level changes.',
            choices: [
              {
                text: "A) Ignore the economics. Gambling will fix all my finance worries.",
                moneyChange: -1000,
                happinessChange: -15,
                safetyChange: -20,
                result:
                  "You decided to gamble instead of saving for unexpected costs. You lost €1000 at the casino. When your phone broke next month, you had no money left and had to borrow from friends. You felt stressed and regretful.",
                tip: "Keep a little extra money aside for surprises. Track your spending so you notice patterns. For bigger economy-wide changes, like rising prices, save a bit more each month to avoid being caught off guard.",
              },
              {
                text: "B) Take micro- and macro economics seriously. Gambling is short and risky choice.",
                moneyChange: 150,
                happinessChange: -5,
                safetyChange: 25,
                result:
                  "You avoided the casino and instead saved €150 for unexpected costs. When your laptop needed repairs, you were prepared! You felt less stressed knowing you had a buffer, even though it meant skipping some entertainment this month.",
                tip: "Keep a little extra money aside for surprises. Track your spending so you notice patterns. For bigger economy-wide changes, like rising prices, save a bit more each month to avoid being caught off guard.",
              },
            ],
          },
        },
      ],
      educationalNote:
        "Building an emergency fund helps you handle unexpected costs without going into debt. Gambling is never a solution to financial problems.",
    },
  ],

  office: [
    // ACTIVE: Paycheck Puzzle - Multi-page scenario
    {
      title: "💼 Paycheck Puzzle: Taxes, Pension & More!",
      isMultiPage: true,
      pages: [
        {
          type: "intro",
          content: {
            title: "💼 Paycheck Puzzle: Taxes, Pension & More!",
            storyIntro:
              "Congrats! Your first paycheck just arrived. But wait… why is the amount less than you expected? Let's break it down and see where your money goes before it lands in your account.",
          },
        },
        {
          type: "lesson",
          content: {
            title: "Lesson – What Happens to Your Paycheck",
            description:
              "When you get paid in Finland, several deductions are automatically taken:",
            deductions: [
              {
                title: "💼 Taxes:",
                text: "Income tax goes to the government to pay for schools, healthcare, roads, and other services.",
              },
              {
                title: "💼 Pension Contribution:",
                text: "A portion of your salary goes into a pension fund for your future retirement.",
              },
              {
                title:
                  "💼 Unemployment Insurance (Työttömyysvakuutus):",
                text: "Helps provide support if you lose your job unexpectedly.",
              },
            ],
            conclusion:
              "After these deductions, the remaining money is your net salary, which you can spend, save, or invest.",
          },
        },
        {
          type: "importance",
          content: {
            title: "Why it matters",
            text: "Understanding your paycheck helps you: Know how much you really have to spend, plan your budget effectively, and avoid surprises when paying bills or saving. Ignoring deductions can lead to confusion and overspending. Misunderstanding your net salary may make it harder to budget for essentials, emergencies, and fun activities.",
            bulletPoints: [
              "Know how much you really have to spend.",
              "Plan your budget effectively.",
              "Avoid surprises when paying bills or saving.",
            ],
            warning:
              "Ignoring deductions can lead to confusion and overspending. Misunderstanding your net salary may make it harder to budget for essentials, emergencies, and fun activities.",
          },
        },
        {
          type: "task",
          content: {
            title: "Your Task",
            description:
              "Open your first virtual paycheck. Identify taxes, pension contributions, and unemployment deductions. Calculate your net income and assign it to Needs, Wants, and Future You in your budget. Watch how this affects your stress level and progress toward goals in the game.",
            choices: [
              {
                text: "A) Ignore this and live a life of ignorance.",
                happinessChange: 5,
                safetyChange: -20,
                result:
                  "You chose to ignore your paycheck details. A few months later, you were surprised when bills came due and you didn't have enough money. You overspent thinking you had more than you actually did, and now you're stressed about making ends meet.",
                tip: "Check your pay slip carefully each month. Keep track of deductions and calculate your net income. Use your net income to plan your budget using the 50–30–20 rule.",
              },
              {
                text: "B) Take responsibility about this.",
                happinessChange: -5,
                safetyChange: 25,
                result:
                  "You carefully reviewed your paycheck and understood where every euro went. You created a budget based on your net salary and felt more in control. Though it was a bit overwhelming at first, you now feel confident managing your money and planning for the future.",
                tip: "Check your pay slip carefully each month. Keep track of deductions and calculate your net income. Use your net income to plan your budget using the 50–30–20 rule.",
              },
            ],
          },
        },
      ],
      educationalNote:
        "Understanding your paycheck helps you budget better and plan for the future.",
    },
  ],

  store: [
    // ACTIVE: Shopping - Multi-page scenario
    {
      title: "🛒 Shopping",
      isMultiPage: true,
      pages: [
        {
          type: "intro",
          content: {
            title: "🛒 Shopping",
            storyIntro:
              "Now you have to buy all necessary things. Be careful to not overbudget it.",
          },
        },
        {
          type: "dragdrop",
          content: {
            title: "Shopping Time",
            items: [
              { id: "food", text: "Food", price: 20 },
              {
                id: "toilet",
                text: "Toilet supplies",
                price: 10,
              },
              { id: "clothes", text: "Clothes", price: 200 },
              { id: "games", text: "Video games", price: 150 },
            ],
          },
        },
        {
          type: "shoppingresult",
          content: {
            title: "Shopping Results",
          },
        },
      ],
      educationalNote:
        "Learning to budget for necessities helps you avoid overspending and stay financially stable.",
    },
  ],

  school: [],
};
