// Scenarios for the experiment
var stimuli = [
  // ANXIETY items
  { stimulus: "The flight attendant announces a flight delay.", words: ["Aircraft maintenance", "Distancing himself"], labels: ["benign", "anxiety"] },
  { stimulus: "People laugh after something you said.", words: ["Funny", "Embarrassing"], labels: ["benign", "anxiety"] },
  { stimulus: "You have a big presentation tomorrow, and you cannot sleep.", words: ["Excited", "Unprepared"], labels: ["benign", "anxiety"] },
  { stimulus: "You finish last among everyone on a test.", words: ["Cautious", "Stupid"], labels: ["benign", "anxiety"] },
  { stimulus: "Your supervisor asks to chat privately.", words: ["Promotion", "Scolding"], labels: ["benign", "anxiety"] },
  { stimulus: "A colleague mentions they heard a rumour about upcoming layoffs. You are certain of your outcome.", words: ["Stay", "Laid off"], labels: ["benign", "anxiety"] },
  { stimulus: "Your friend is not replying to your messages. Something must be up.", words: ["Occupied", "Upset"], labels: ["benign", "anxiety"] },
  { stimulus: "Your date is not here yet.", words: ["Traffic", "No-show"], labels: ["benign", "anxiety"] },
  { stimulus: "You are at a social networking event and notice how your body feels.", words: ["Relaxed", "Tense"], labels: ["benign", "anxiety"] },
  
  // DEPRESSION items
  { stimulus: "You wake up and get out of bed.", words: ["Energetic", "Lethargic"], labels: ["benign", "depression"] },
  { stimulus: "You just finished a major project.", words: ["Relieved", "Tired"], labels: ["benign", "depression"] },
  { stimulus: "Your parents hire a lawyer.", words: ["New business", "Divorce"], labels: ["benign", "depression"] },
  { stimulus: "You organise a year-end party for your old-time friends, but no one shows up.", words: ["Delayed", "Boring"], labels: ["benign", "depression"] },
  { stimulus: "You get a new job.", words: ["Qualified", "Unqualified"], labels: ["benign", "depression"] },
  { stimulus: "It's New Year's Eve and you think about the year ahead of you.", words: ["Hope", "Dread"], labels: ["benign", "depression"] },
  { stimulus: "You go to a place you visited as a child and walk around.", words: ["Reminiscent", "Tense"], labels: ["benign", "depression"] },
  { stimulus: "You bought your friend a birthday gift. She opens it and makes an expression.", words: ["Excited", "Disappointed"], labels: ["benign", "depression"] },
  { stimulus: "You are lying on the beach.", words: ["Relaxed", "Stressed"], labels: ["benign", "depression"] },
  
  // POSITIVE items
  { stimulus: "You visit to a new coffee shop that opened in your neighbourhood.", words: ["Get coffee", "Relax"], labels: ["benign", "positive"] },
  { stimulus: "Paul was praised for when he created multiple Excel sheets for a project.", words: ["Bold", "Meticulous"], labels: ["benign", "positive"] },
  { stimulus: "You finally meet your friends after a long time. You catch up over food.", words: ["Lunch", "Dinner"], labels: ["benign", "positive"] },
  { stimulus: "You are exercising at a nearby park and hear a loud panting noise behind you.", words: ["Dog", "Runner"], labels: ["benign", "positive"] },
  { stimulus: "You are posted to a separate office for work, and your colleague decides to follow you there.", words: ["Loyal", "Helpful"], labels: ["benign", "positive"] },
  { stimulus: "There is a sudden power outage in your house.", words: ["Storm", "Maintenance work"], labels: ["benign", "positive"] },
  { stimulus: "Andrea is on a nature walk and notices her mood.", words: ["Tranquil", "Elevated"], labels: ["benign", "positive"] },
  { stimulus: "You receive a call from an unknown number.", words: ["Long-lost friend", "Delivery order"], labels: ["benign", "positive"] },
  { stimulus: "You are entering a rollercoaster ride.", words: ["Adrenaline", "Excitement"], labels: ["benign", "positive"] }
];
shuffleArray(stimuli);