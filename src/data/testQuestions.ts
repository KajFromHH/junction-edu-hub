// This test questions is used for generating unique character storyline. 

export type TestOption = {
  id: string;
  text: string;
  score: number; // optional numeric encoding for simple scoring
};

export type TestQuestion = {
  id: string;
  text: string;
  options: TestOption[];
};

export const testQuestions: TestQuestion[] = [
  {
    id: "q1_foi",
    text: "Growing up, how would you describe your family’s financial situation?",
    options: [
      { id: "q1_a", text: "Money was often tight", score: 0 },
      { id: "q1_b", text: "Stable, basic needs covered", score: 1 },
      { id: "q1_c", text: "Comfortable", score: 2 },
      { id: "q1_d", text: "Well-off", score: 3 }
    ]
  },
  {
    id: "q2_support",
    text: "How much financial support do you expect from family in the next 1–3 years?",
    options: [
      { id: "q2_a", text: "None", score: 0 },
      { id: "q2_b", text: "Small, occasional help", score: 1 },
      { id: "q2_c", text: "Moderate help for big transitions", score: 2 },
      { id: "q2_d", text: "Consistent help", score: 3 }
    ]
  },
  {
    id: "q3_behaviour",
    text: "How do you typically handle money you've earned?",
    options: [
      { id: "q3_a", text: "Spend most quickly", score: 0 },
      { id: "q3_b", text: "Try to save but often spend", score: 1 },
      { id: "q3_c", text: "Save a portion and plan", score: 2 },
      { id: "q3_d", text: "Structured plan, stick to budget", score: 3 }
    ]
  },
  {
    id: "q4_impulse",
    text: "Which describes your approach to impulse decisions?",
    options: [
      { id: "q4_a", text: "I act without thinking", score: 0 },
      { id: "q4_b", text: "I sometimes give in", score: 1 },
      { id: "q4_c", text: "I weigh consequences", score: 2 },
      { id: "q4_d", text: "I rarely act impulsively", score: 3 }
    ]
  },
  {
    id: "q5_priorities",
    text: "What will be your main spending priorities when you move out?",
    options: [
      { id: "q5_a", text: "Social life & experiences", score: 0 },
      { id: "q5_b", text: "Clothes & tech", score: 1 },
      { id: "q5_c", text: "Practical purchases", score: 2 },
      { id: "q5_d", text: "Saving/investing", score: 3 }
    ]
  },
  {
    id: "q6_career",
    text: "Which matches your career direction?",
    options: [
      { id: "q6_a", text: "University degree", score: 3 },
      { id: "q6_b", text: "Vocational training", score: 1 },
      { id: "q6_c", text: "Freelance/entrepreneur", score: 0 },
      { id: "q6_d", text: "Undecided", score: 2 }
    ]
  },
  {
    id: "q7_goal",
    text: "What is your biggest financial goal for your 20s?",
    options: [
      { id: "q7_a", text: "Gaining stability", score: 0 },
      { id: "q7_b", text: "Saving for a big purchase", score: 1 },
      { id: "q7_c", text: "Freedom & flexibility", score: 2 },
      { id: "q7_d", text: "Building wealth", score: 3 }
    ]
  },
  {
    id: "q8_lifestyle",
    text: "What lifestyle do you imagine?",
    options: [
      { id: "q8_a", text: "Simple & affordable", score: 0 },
      { id: "q8_b", text: "Balanced comfort + fun", score: 1 },
      { id: "q8_c", text: "Trendy & social", score: 2 },
      { id: "q8_d", text: "Premium & high-tech", score: 3 }
    ]
  }
];