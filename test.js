// Scenarios for the experiment
var stimuli = [
  // ANXIETY items
  { stimulus: "You hear a noise in the night. It is from a _____.", words: ["dog", "robbery"], labels: ["benign", "anxiety"] },
  { stimulus: "Your friend comments on your behaviour. She _____ of how you acted.", words: ["approves", "disapproves"], labels: ["benign", "anxiety"] },
  { stimulus: "You give a speech at your friend's wedding. When you have finished, you observe the audience's reaction. They are _____.", words: ["smiling", "frowning"], labels: ["benign", "anxiety"] },
  { stimulus: "Your boss wants to meet you to _____ you.", words: ["praise", "criticise"], labels: ["benign", "anxiety"] },
  { stimulus: "There is a change in your salary. You are getting a _____.", words: ["raise", "pay cut"], labels: ["benign", "anxiety"] },
  { stimulus: "Your friend seems hesitant in sharing information with you. Your friend is _____.", words: ["planning a surprise", "distancing himself"], labels: ["benign", "anxiety"] },
  { stimulus: "Your date has to leave early. Your date is _____.", words: ["busy", "bored"], labels: ["benign", "anxiety"] },
  { stimulus: "You don't know how to answer a question in class. You feel _____.", words: ["curious", "incompetent"], labels: ["benign", "anxiety"] },
  { stimulus: "A friend does not respond when you wave hello because she is _____.", words: ["distracted", "mad"], labels: ["benign", "anxiety"] },
  
  // DEPRESSION items
  { stimulus: "You see yourself in the mirror in the morning. You look _____.", words: ["sleepy", "horrible"], labels: ["benign", "depression"] },
  { stimulus: "Your new job has changed your life for the _____.", words: ["better", "worse"], labels: ["benign", "depression"] },
  { stimulus: "Your partner is not home yet. He/she is _____.", words: ["delayed", "cheating"], labels: ["benign", "depression"] },
  { stimulus: "People always tell you to smile. You are _____.", words: ["loved", "defective"], labels: ["benign", "depression"] },
  { stimulus: "You are up for an important evaluation. You predict that you will _____.", words: ["pass", "fail"], labels: ["benign", "depression"] },
  { stimulus: "You are thinking about your future, feeling _____.", words: ["enthusiastic", "worried"], labels: ["benign", "depression"] },
  { stimulus: "You are cooking and accidentally burned a dish. You decide to _____.", words: ["try again", "stop"], labels: ["benign", "depression"] },
  { stimulus: "You used to regularly attend a weekly pub quiz with your friends but no longer want to. This is because you are _____.", words: ["busy", "not interested"], labels: ["benign", "depression"] },
  { stimulus: "There is a moment of silence during a conversation. You find this _____.", words: ["natural", "embarrassing"], labels: ["benign", "depression"] },
  
  // POSITIVE items
  { stimulus: "You are on holiday. When you arrived at the hotel, you feel a sense of _____.", words: ["excitement", "calm"], labels: ["benign", "positive"] },
  { stimulus: "Micah was waiting for his date at the cafe and wants to make a good impression. He sprays _____.", words: ["breath spray", "cologne"], labels: ["benign", "positive"] },
  { stimulus: "Christmas is around the corner and you have to attend a family _____.", words: ["picnic", "gathering"], labels: ["benign", "positive"] },
  { stimulus: "On the way home, it starts to rain. You reach for your _____.", words: ["umbrella", "poncho"], labels: ["benign", "positive"] },
  { stimulus: "You play music in the car but no sound comes out. Your phone is _____.", words: ["dead", "not plugged in"], labels: ["benign", "positive"] },
  { stimulus: "Ashley noticed that her garden is overgrown, and is attracting many _____.", words: ["butterflies", "bees"], labels: ["benign", "positive"] },
  { stimulus: "The doorbell rings but you are not expecting anyone. You opened the door and it is a _____.", words: ["girl scout", "real estate agent"], labels: ["benign", "positive"] },
  { stimulus: "Samuel bumped into a _____ at the petrol station.", words: ["friend", "relative"], labels: ["benign", "positive"] },
  { stimulus: "Teachers commented that you were an _____ student growing up.", words: ["inquisitive", "responsible"], labels: ["benign", "positive"] }
];
shuffleArray(stimuli);