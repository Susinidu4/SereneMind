const mentalHealthSuggestions = [
  {
    "id": 1,
    "title": "Morning Meditation",
    "plain": "Start your day with a 10-minute meditation to clear your mind and set a positive tone for the day.",
    "time duration per day": "10 minutes",
    "category": "😔" // Sad
  },
  {
    "id": 2,
    "title": "Gratitude Journaling",
    "plain": "Write down three things you are grateful for each day to cultivate a positive mindset.",
    "time duration per day": "5 minutes",
    "category": "😢" // Feeling Down
  },
  {
    "id": 3,
    "title": "Deep Breathing Exercise",
    "plain": "Practice deep breathing for 5 minutes to reduce stress and improve focus.",
    "time duration per day": "5 minutes",
    "category": "😰" // Anxious
  },
  {
    "id": 4,
    "title": "Nature Walk",
    "plain": "Take a 20-minute walk in nature to refresh your mind and boost your mood.",
    "time duration per day": "20 minutes",
    "category": "😴" // Tired
  },
  {
    "id": 5,
    "title": "Digital Detox",
    "plain": "Spend 30 minutes away from screens to reduce mental clutter and improve relaxation.",
    "time duration per day": "30 minutes",
    "category": "😡" // Angry
  },
  {
    "id": 6,
    "title": "Mindful Eating",
    "plain": "Eat one meal a day mindfully, focusing on the taste, texture, and aroma of your food.",
    "time duration per day": "15 minutes",
    "category": "😰" // Anxious
  },
  {
    "id": 7,
    "title": "Positive Affirmations",
    "plain": "Repeat positive affirmations for 5 minutes to build self-confidence and reduce negative thoughts.",
    "time duration per day": "5 minutes",
    "category": "😕" // Confused
  },
  {
    "id": 8,
    "title": "Stretching Routine",
    "plain": "Do a 10-minute stretching routine to release tension and improve physical and mental well-being.",
    "time duration per day": "10 minutes",
    "category": "😴" // Tired
  },
  {
    "id": 9,
    "title": "Reading for Relaxation",
    "plain": "Read a book or article for 20 minutes to unwind and stimulate your mind.",
    "time duration per day": "20 minutes",
    "category": "😰" // Anxious
  },
  {
    "id": 10,
    "title": "Evening Reflection",
    "plain": "Spend 10 minutes reflecting on your day, noting what went well and what you can improve.",
    "time duration per day": "10 minutes",
    "category": "😔" // Sad
  },
  {
    "id": 11,
    "title": "Listen to Calming Music",
    "plain": "Listen to calming music for 15 minutes to relax and reduce anxiety.",
    "time duration per day": "15 minutes",
    "category": "😰" // Anxious
  },
  {
    "id": 12,
    "title": "Practice Yoga",
    "plain": "Engage in a 20-minute yoga session to improve flexibility and mental clarity.",
    "time duration per day": "20 minutes",
    "category": "😴" // Tired
  },
  {
    "id": 13,
    "title": "Social Connection",
    "plain": "Spend 15 minutes connecting with a friend or loved one to strengthen relationships and boost mood.",
    "time duration per day": "15 minutes",
    "category": "😢" // Feeling Down
  },
  {
    "id": 14,
    "title": "Creative Hobby",
    "plain": "Dedicate 30 minutes to a creative hobby like drawing, writing, or crafting to express yourself.",
    "time duration per day": "30 minutes",
    "category": "😕" // Confused
  },
  {
    "id": 15,
    "title": "Mindful Breathing",
    "plain": "Practice mindful breathing for 5 minutes to center yourself and reduce stress.",
    "time duration per day": "5 minutes",
    "category": "😰" // Anxious
  },
  {
    "id": 16,
    "title": "Declutter Your Space",
    "plain": "Spend 15 minutes decluttering a small area of your home to create a sense of order and calm.",
    "time duration per day": "15 minutes",
    "category": "😕" // Confused
  },
  {
    "id": 17,
    "title": "Laugh Therapy",
    "plain": "Watch a funny video or comedy show for 10 minutes to boost your mood and reduce stress.",
    "time duration per day": "10 minutes",
    "category": "😔" // Sad
  },
  {
    "id": 18,
    "title": "Progressive Muscle Relaxation",
    "plain": "Practice progressive muscle relaxation for 10 minutes to release physical tension and calm your mind.",
    "time duration per day": "10 minutes",
    "category": "😡" // Angry
  },
  {
    "id": 19,
    "title": "Set Daily Intentions",
    "plain": "Spend 5 minutes setting daily intentions to focus your energy and prioritize your goals.",
    "time duration per day": "5 minutes",
    "category": "😕" // Confused
  },
  {
    "id": 20,
    "title": "Practice Self-Compassion",
    "plain": "Spend 5 minutes practicing self-compassion by speaking kindly to yourself and acknowledging your efforts.",
    "time duration per day": "5 minutes",
    "category": "😢" // Feeling Down
  },
  {
    "id": 21,
    "title": "Visualization Exercise",
    "plain": "Spend 10 minutes visualizing a peaceful scene or a positive outcome to reduce anxiety and increase optimism.",
    "time duration per day": "10 minutes",
    "category": "😰" // Anxious
  },
  {
    "id": 22,
    "title": "Limit News Consumption",
    "plain": "Limit your news intake to 15 minutes a day to avoid information overload and maintain mental peace.",
    "time duration per day": "15 minutes",
    "category": "😡" // Angry
  },
  {
    "id": 23,
    "title": "Practice Gratitude",
    "plain": "Spend 5 minutes thinking about what you are grateful for to shift your focus to the positive aspects of life.",
    "time duration per day": "5 minutes",
    "category": "😔" // Sad
  },
  {
    "id": 24,
    "title": "Mindful Listening",
    "plain": "Spend 10 minutes practicing mindful listening during a conversation to improve communication and connection.",
    "time duration per day": "10 minutes",
    "category": "😕" // Confused
  },
  {
    "id": 25,
    "title": "Body Scan Meditation",
    "plain": "Do a 10-minute body scan meditation to release tension and increase body awareness.",
    "time duration per day": "10 minutes",
    "category": "😰" // Anxious
  },
  {
    "id": 26,
    "title": "Practice Forgiveness",
    "plain": "Spend 5 minutes reflecting on forgiveness to let go of resentment and improve emotional well-being.",
    "time duration per day": "5 minutes",
    "category": "😡" // Angry
  },
  {
    "id": 27,
    "title": "Engage in Physical Activity",
    "plain": "Spend 30 minutes engaging in physical activity like walking, jogging, or dancing to boost endorphins.",
    "time duration per day": "30 minutes",
    "category": "😴" // Tired
  },
  {
    "id": 28,
    "title": "Practice Mindful Walking",
    "plain": "Spend 15 minutes walking mindfully, focusing on each step and your surroundings.",
    "time duration per day": "15 minutes",
    "category": "😰" // Anxious
  },
  {
    "id": 29,
    "title": "Write a Letter to Yourself",
    "plain": "Write a letter to yourself expressing kindness and encouragement for 10 minutes.",
    "time duration per day": "10 minutes",
    "category": "😢" // Feeling Down
  },
  {
    "id": 30,
    "title": "Practice Grounding Techniques",
    "plain": "Spend 5 minutes practicing grounding techniques like focusing on your senses to reduce anxiety.",
    "time duration per day": "5 minutes",
    "category": "😰" // Anxious
  },
  {
    "id": 31,
    "title": "Limit Social Media Use",
    "plain": "Limit social media use to 20 minutes a day to reduce comparison and improve mental well-being.",
    "time duration per day": "20 minutes",
    "category": "😕" // Confused
  },
  {
    "id": 32,
    "title": "Practice Loving-Kindness Meditation",
    "plain": "Spend 10 minutes practicing loving-kindness meditation to cultivate compassion and positivity.",
    "time duration per day": "10 minutes",
    "category": "😔" // Sad
  },
  {
    "id": 33,
    "title": "Engage in a Hobby",
    "plain": "Spend 30 minutes engaging in a hobby you enjoy to relax and recharge.",
    "time duration per day": "30 minutes",
    "category": "😕" // Confused
  },
  {
    "id": 34,
    "title": "Practice Mindful Showering",
    "plain": "Spend 10 minutes showering mindfully, focusing on the sensations of water and soap.",
    "time duration per day": "10 minutes",
    "category": "😴" // Tired
  },
  {
    "id": 35,
    "title": "Write Down Your Worries",
    "plain": "Spend 10 minutes writing down your worries to clear your mind and gain perspective.",
    "time duration per day": "10 minutes",
    "category": "😰" // Anxious
  },
  {
    "id": 36,
    "title": "Practice Self-Care",
    "plain": "Spend 20 minutes practicing self-care activities like taking a bath or doing a face mask.",
    "time duration per day": "20 minutes",
    "category": "😢" // Feeling Down
  },
  {
    "id": 37,
    "title": "Practice Mindful Eating",
    "plain": "Spend 15 minutes eating a snack mindfully, focusing on the taste and texture.",
    "time duration per day": "15 minutes",
    "category": "😴" // Tired
  },
  {
    "id": 38,
    "title": "Engage in Volunteer Work",
    "plain": "Spend 30 minutes engaging in volunteer work to boost your mood and sense of purpose.",
    "time duration per day": "30 minutes",
    "category": "😔" // Sad
  },
  {
    "id": 39,
    "title": "Practice Visualization",
    "plain": "Spend 10 minutes visualizing your goals and dreams to increase motivation and positivity.",
    "time duration per day": "10 minutes",
    "category": "😕" // Confused
  },
  {
    "id": 40,
    "title": "Practice Mindful Breathing",
    "plain": "Spend 5 minutes practicing mindful breathing to calm your mind and reduce stress.",
    "time duration per day": "5 minutes",
    "category": "😰" // Anxious
  },
  {
    "id": 41,
    "title": "Write a Gratitude Letter",
    "plain": "Spend 10 minutes writing a gratitude letter to someone who has positively impacted your life.",
    "time duration per day": "10 minutes",
    "category": "😢" // Feeling Down
  },
  {
    "id": 42,
    "title": "Practice Mindful Listening",
    "plain": "Spend 10 minutes practicing mindful listening during a conversation to improve connection.",
    "time duration per day": "10 minutes",
    "category": "😕" // Confused
  },
  {
    "id": 43,
    "title": "Engage in a Relaxing Activity",
    "plain": "Spend 20 minutes engaging in a relaxing activity like knitting or coloring to reduce stress.",
    "time duration per day": "20 minutes",
    "category": "😴" // Tired
  },
  {
    "id": 44,
    "title": "Practice Mindful Walking",
    "plain": "Spend 15 minutes walking mindfully, focusing on each step and your surroundings.",
    "time duration per day": "15 minutes",
    "category": "😰" // Anxious
  },
  {
    "id": 45,
    "title": "Write Down Your Achievements",
    "plain": "Spend 5 minutes writing down your achievements to boost self-esteem and motivation.",
    "time duration per day": "5 minutes",
    "category": "😔" // Sad
  },
  {
    "id": 46,
    "title": "Practice Mindful Breathing",
    "plain": "Spend 5 minutes practicing mindful breathing to center yourself and reduce anxiety.",
    "time duration per day": "5 minutes",
    "category": "😰" // Anxious
  },
  {
    "id": 47,
    "title": "Engage in a Creative Activity",
    "plain": "Spend 30 minutes engaging in a creative activity like painting or writing to express yourself.",
    "time duration per day": "30 minutes",
    "category": "😕" // Confused
  },
  {
    "id": 48,
    "title": "Practice Gratitude",
    "plain": "Spend 5 minutes reflecting on what you are grateful for to shift your focus to the positive.",
    "time duration per day": "5 minutes",
    "category": "😔" // Sad
  },
  {
    "id": 49,
    "title": "Practice Mindful Eating",
    "plain": "Spend 15 minutes eating a meal mindfully, focusing on the taste and texture of your food.",
    "time duration per day": "15 minutes",
    "category": "😴" // Tired
  },
  {
    "id": 50,
    "title": "Engage in Physical Activity",
    "plain": "Spend 30 minutes engaging in physical activity like jogging or yoga to boost your mood.",
    "time duration per day": "30 minutes",
    "category": "😰" // Anxious
  }
];

export default mentalHealthSuggestions;