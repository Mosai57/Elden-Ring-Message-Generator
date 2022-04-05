const words = ["enemy", "weak foe", "strong foe", "monster", "dragon", "boss", "sentry", "group", "pack", "decoy", "undead", "soldier", "knight", "cavalier", "archer", "sniper", "mage", "ordnance", "monarch", "lord", "demi-human", "outsider", "giant", "horse", "dog", "wolf", "rat", "beast", "bird", "raptor", "snake", "crab", "prawn", "octopus", "bug", "scarab", "slug", "wraith", "skeleton", "monstrosity", "ill-omened creature", "Tarnished", "warrior", "swordfighter", "knight", "samurai", "sorcerer", "cleric", "sage", "merchant", "teacher", "master", "friend", "lover", "old dear", "old codger", "angel", "fat coinpurse", "pauper", "good sort", "wicked sort", "plump sort", "skinny sort", "lovable sort", "pathetic sort", "strange sort", "numble sort", "laggardly sort", "invisible sort", "unfathomable sort", "giant sort", "sinner", "thief", "liar", "dastard", "traitor", "pair", "trio", "noble", "aristocrat", "hero", "champion", "monarch", "lord", "god", "item", "necessary item", "precious item", "something", "something incredible", "treasure chest", "corpse", "coffin", "trap", "armament", "shield", "bow", "projectile weapon", "armor", "talisman", "skill", "sorcery", "incantation", "map", "material", "flower", "grass", "tree", "fruit", "seed", "mushroom", "tear", "crystal", "butterfly", "bug", "dung", "grace", "door", "key", "ladder", "lever", "lift", "spiritspring", "sending gate", "stone astrolabe", "Birdseye Telescope", "message", "bloodstain", "Erdtree", "Elden Ring", "close-quarters battle", "ranged battle", "horseback battle", "luring out", "defeating one-by-one", "taking on all at once", "rushing in", "stealth", "mimicry", "confusion", "pursuit", "fleeing", "summoning", "circling around", "jumping off", "dashing through", "brief respite", "attacking", "jump attack", "running attack", "critical hit", "two-handing", "blocking", "parrying", "guard counter", "sorcery", "incantation", "skill", "summoning", "throwing", "healing", "running", "rolling", "backstepping", "jumping", "crouching", "target lock", "item crafting", "gesturing", "morning", "noon", "evening", "night", "clear sky", "overcast", "rain", "storm", "mist", "snow", "patrolling", "procession", "crowd", "surprise attack", "ambush", "pincer attack", "beating to a pulp", "battle", "reinforcements", "ritual", "explosion", "high spot", "defensible spot", "climbable spot", "bright spot", "dark spot", "open area", "cramped area", "hiding place", "sniping spot", "recon spot", "safety", "danger", "gorgeous view", "detour", "hidden path", "secret passage", "shortcut", "dead end", "looking away", "unnoticed", "out of stamina", "high road", "checkpoint", "bridge", "castle", "fort", "city", "ruins", "church", "tower", "camp site", "house", "cemetery", "underground tomb", "tunnel", "cave", "evergaol", "great tree", "cellar", "surface", "underground", "forest", "river", "lake", "bog", "mountain", "valley", "cliff", "waterside", "nest", "hole", "east", "west", "south", "north", "ahead", "behind", "left", "right", "center", "up", "down", "edge", "head", "stomach", "back", "arms", "legs", "rump", "tail", "core", "fingers", "physical", "standard", "striking", "slashing", "piercing", "fire", "lightning", "magic", "holy", "poison", "toxic", "scarlet rot", "blood loss", "frost", "sleep", "madness", "death", "life", "Death", "light", "dark", "stars", "fire", "Order", "chaos", "joy", "wrath", "suffering", "sadness", "comfort", "bliss", "misfortune", "good fortune", "bad luck", "hope", "despair", "victory", "defeat", "research", "faith", "abundance", "rot", "loyalty", "injustice", "secret", "opportunity", "pickle", "clue", "friendship", "love", "bravery", "vigor", "furtitude", "confidence", "distracted", "unguarded", "introspection", "regret", "resignation", "futility", "on the brink", "betrayal", "revenge", "destruction", "recklessness", "calmness", "vigilance", "tranquility", "sound", "tears", "sleep", "depths", "dregs", "fear", "sacrifice", "ruin", "good luck", "look carefully", "listen carefully", "think carefully", "well done", "I did it!", "I've failed...", "here!", "not here!", "don't you dare!", "do it!", "I can't take this...", "don't think", "so lonely...", "here again...", "just getting started", "stay calm", "keep moving", "turn back", "give up", "don't give up", "help me...", "I don't believe it...", "too high up", "I want to go home...", "it's like a dream...", "seems familiar...", "beautiful...", "you don't have the right", "are you ready?"];
const template = ["DELME ahead", "Likely DELME", "If Only I had a DELME", "DELME, O DELME", "Ahh, DELME", "No DELME ahead", "First off, DELME", "Didn't expect DELME", "Behold, DELME!", "DELME", "DELME required ahead", "Seek DELME", "Visions of DELME", "Offer DELME", "DELME!", "Be Wary of DELME", "Still no DELME", "Could this be a DELME?", "Praise the DELME", "DELME?", "Try DELME", "Why is it always DELME?", "Time for DELME", "Let there be DELME"];
const conjunction = ["and then", "or", "but", "therefore", "in short", "except", "by the way", "so to speak", "all the more"];

const regexPunctuation = /[!?]$/g;
const regexDelim 	   = /DELME/g;

// RNG
function getRandomInt(max) {
	return Math.floor(Math.random() * max);
}

// Coin Flip
function getRandomBool() {
	let coin = getRandomInt(2);
	if ( coin == 0 ) {
		return false;
	} else {
		return true;
	}
}

function genMessage() {
	// Variable setup
	var twoTempl	= getRandomBool();
	var templateSel = [];
	var wordSel 	= [];
	var wordCount 	= 0;
	var output		= "";
	var tempTempl	= "";
	var tempWord 	= "";
	var buffer		= "";

	// Randomly select the template we will use. This system accounts for
	// one or two templates being used, determined by the value in twoTempl
	
	// Handles the case where we have two templates. This captures what will be
	// the first template, ensuring we don't get one ending in ? or ! to keep
	// the statement looking like a single sentence.
	if(twoTempl) {
		let tempSel = "";
		do {
			tempSel = template[ getRandomInt(template.length) ];
		} while(regexPunctuation.test(tempSel));
		templateSel.push(tempSel);
		wordCount++;
	}

	// Grabs a single template
	templateSel.push( template[ getRandomInt(template.length) ] );
	wordCount++;
	
	// Get the words we will use for the substitutions.
	for (let ctr = 0; ctr < wordCount; ctr++) {
		var word = "undefined";
		do {
			word = words[ getRandomInt(words.length)-1 ];
		} while ( word == "undefined" );
		wordSel.push(word);
	}

	// Do the initial template substitution
	tempTempl = String(templateSel.shift());
	output += tempTempl.replaceAll(regexDelim, wordSel[0]);

	// If we have two templates, grab a conjunction and repeat the above
	// process for the second template.
	if(twoTempl) {
		tempTempl = " " + conjunction[ getRandomInt(conjunction.length) ] + " ";
		tempTempl += String(templateSel.shift());
		output += tempTempl.replace(regexDelim, wordSel[1]);
	}

	// Capitalize the first letter to make it look pretty
	buffer = output.toLowerCase();
	output = buffer.charAt(0).toUpperCase() + buffer.slice(1);

	return output;
}

genMessage();
