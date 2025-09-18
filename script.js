// DOM Elements
const container = document.getElementById('poems-container');
const modal = document.getElementById('modalOverlay');
const modalFullText = document.getElementById('modalFullText');
const closeModalBtn = document.querySelector('.modal-close');

// Number of lines to show in preview
const PREVIEW_LINES = 4;

// EMBEDDED poems.json content (parsed as JavaScript array)
const poems = [
  {
    "title": "If you look at what you have in life, you'll always have more. If you look at what you don't have in life, you'll never have enough.",
    "content": "If you look at what you have in life, you'll always have more. If you look at what you don't have in life, you'll never have enough."
  },
  {
    "title": "If you look at what you have in life, you'll always have more. If you look at what you don't have in life, you'll never have enough.",
    "content": "If you look at what you have in life, you'll always have more. If you look at what you don't have in life, you'll never have enough."
  },
  {
    "title": "First Snow",
    "content": "A rabbit has stopped on the gravel driveway:\nimbibing the silence,\nyou stare at spruce needles:\nthere's no sound of a leaf blower, \nno sign of a black bear;\na few weeks ago, a buck scraped his rack\nagainst an aspen trunk;\na carpenter scribed a plank along a curved stone wall.\nYou only spot the rabbit's ears and tail:\nwhen it moves, you locate it against speckled gravel,\nbut when it stops, it blends in again;\nthe world of being is like this gravel:\nyou think you own a car, a house,\nthis blue-zigzagged shirt, but you just borrow these things. \nYesterday, you constructed an aqueduct of dreams\nand stood at Gibraltar,\nbut you possess nothing.\nSnow melts into a pool of clear water;\nand, in this stillness,\nstarlight behind daylight wherever you gaze."
  },
  {
    "title": "First Snow",
    "content": "A rabbit has stopped on the gravel driveway:\nimbibing the silence,\nyou stare at spruce needles:\nthere's no sound of a leaf blower, \nno sign of a black bear;\na few weeks ago, a buck scraped his rack\nagainst an aspen trunk;\na carpenter scribed a plank along a curved stone wall.\nYou only spot the rabbit's ears and tail:\nwhen it moves, you locate it against speckled gravel,\nbut when it stops, it blends in again;\nthe world of being is like this gravel:\nyou think you own a car, a house,\nthis blue-zigzagged shirt, but you just borrow these things. \nYesterday, you constructed an aqueduct of dreams\nand stood at Gibraltar,\nbut you possess nothing.\nSnow melts into a pool of clear water;\nand, in this stillness,\nstarlight behind daylight wherever you gaze."
  },
  {
    "title": "Booker T. and W.E.B.",
    "content": "“It seems to me,” said Booker T.,\n“It shows a mighty lot of cheek\nTo study chemistry and Greek\nWhen Mister Charlie needs a hand\nTo hoe the cotton on his land,\nAnd when Miss Ann looks for a cook,\nWhy stick your nose inside a book?”\n“I don’t agree,” said W.E.B.,\n“If I should have the drive to seek\nKnowledge of chemistry or Greek,\nI’ll do it. Charles and Miss can look\nAnother place for hand or cook.\nSome men rejoice in skill of hand,\nAnd some in cultivating land,\nBut there are others who maintain\nThe right to cultivate the brain.”\n“It seems to me,” said Booker T.,\n“That all you folks have missed the boat\nWho shout about the right to vote,\nAnd spend vain days and sleepless nights\nIn uproar over civil rights.\nJust keep your mouths shut, do not grouse,\nBut work, and save, and buy a house.”\n“I don’t agree,” said W.E.B.,\n“For what can property avail\nIf dignity and justice fail.\nUnless you help to make the laws,\nThey’ll steal your house with trumped-up clause.\nA rope’s as tight, a fire as hot,\nNo matter how much cash you’ve got.\nSpeak soft, and try your little plan,\nBut as for me, I’ll be a man.”\n“It seems to me,” said Booker T.—\n“I don’t agree,”\nSaid W.E.B."
  },
  {
    "title": "Booker T. and W.E.B.",
    "content": "“It seems to me,” said Booker T.,\n“It shows a mighty lot of cheek\nTo study chemistry and Greek\nWhen Mister Charlie needs a hand\nTo hoe the cotton on his land,\nAnd when Miss Ann looks for a cook,\nWhy stick your nose inside a book?”\n“I don’t agree,” said W.E.B.,\n“If I should have the drive to seek\nKnowledge of chemistry or Greek,\nI’ll do it. Charles and Miss can look\nAnother place for hand or cook.\nSome men rejoice in skill of hand,\nAnd some in cultivating land,\nBut there are others who maintain\nThe right to cultivate the brain.”\n“It seems to me,” said Booker T.,\n“That all you folks have missed the boat\nWho shout about the right to vote,\nAnd spend vain days and sleepless nights\nIn uproar over civil rights.\nJust keep your mouths shut, do not grouse,\nBut work, and save, and buy a house.”\n“I don’t agree,” said W.E.B.,\n“For what can property avail\nIf dignity and justice fail.\nUnless you help to make the laws,\nThey’ll steal your house with trumped-up clause.\nA rope’s as tight, a fire as hot,\nNo matter how much cash you’ve got.\nSpeak soft, and try your little plan,\nBut as for me, I’ll be a man.”\n“It seems to me,” said Booker T.—\n“I don’t agree,”\nSaid W.E.B."
  },
  {
    "title": "Anyone can get dressed up and look glamorous but it is how people dress in their days off that are the most intriguing",
    "content": "Anyone can get dressed up and look glamorous but it is how people dress in their days off that are the most intriguing"
  },
  {
    "title": "Anyone can get dressed up and look glamorous but it is how people dress in their days off that are the most intriguing",
    "content": "Anyone can get dressed up and look glamorous but it is how people dress in their days off that are the most intriguing"
  },
  {
    "title": "I, Too",
    "content": "I, too, sing America.\nI am the darker brother.\nThey send me to eat in the kitchen\nWhen company comes,\nBut I laugh,\nAnd eat well,\nAnd grow strong.\nTomorrow,\nI’ll be at the table\nWhen company comes.\nNobody’ll dare\nSay to me,\n“Eat in the kitchen,”\nThen.\nBesides,\nThey’ll see how beautiful I am\nAnd be ashamed—\nI, too, am America."
  },
  {
    "title": "I, Too",
    "content": "I, too, sing America.\nI am the darker brother.\nThey send me to eat in the kitchen\nWhen company comes,\nBut I laugh,\nAnd eat well,\nAnd grow strong.\nTomorrow,\nI’ll be at the table\nWhen company comes.\nNobody’ll dare\nSay to me,\n“Eat in the kitchen,”\nThen.\nBesides,\nThey’ll see how beautiful I am\nAnd be ashamed—\nI, too, am America."
  },
  {
    "title": "This Beginning May Have Always Meant This End",
    "content": "Coming from a place where we meandered mornings and met quail, scrub jay, mockingbird, i knew coyote, like everyone else, i knew \ncactus, knew tumbleweed, lichen on the rocks and pill bugs beneath, rattlers sometimes, the soft smell of sage and the ferment of cactus pear. coming from this place, from a place where grass might grow greener on the hillside in winter than in any yard, where, the whole rest of the year, everything i loved, chaparral pea, bottle brush tree, jacaranda, mariposa, pinyon and desert oak, the kumquat in the back garden and wisteria vining the porch, the dry grass whispering long after the last rains, raccoons in and out of the hills, trash hurled by the hottest wind, the dry grass tall now and golden, lawn chairs, \neucalyptus, everything, in a place we knew, every thing, we knew, little and large and mine and ours, except horror, all of it, everything could flame up that quickly, could flare and be gone."
  },
  {
    "title": "This Beginning May Have Always Meant This End",
    "content": "Coming from a place where we meandered mornings and met quail, scrub jay, mockingbird, i knew coyote, like everyone else, i knew \ncactus, knew tumbleweed, lichen on the rocks and pill bugs beneath, rattlers sometimes, the soft smell of sage and the ferment of cactus pear. coming from this place, from a place where grass might grow greener on the hillside in winter than in any yard, where, the whole rest of the year, everything i loved, chaparral pea, bottle brush tree, jacaranda, mariposa, pinyon and desert oak, the kumquat in the back garden and wisteria vining the porch, the dry grass whispering long after the last rains, raccoons in and out of the hills, trash hurled by the hottest wind, the dry grass tall now and golden, lawn chairs, \neucalyptus, everything, in a place we knew, every thing, we knew, little and large and mine and ours, except horror, all of it, everything could flame up that quickly, could flare and be gone."
  },
  {
    "title": "If you look at what you have in life, you'll always have more. If you look at what you don't have in life, you'll never have enough.",
    "content": "If you look at what you have in life, you'll always have more. If you look at what you don't have in life, you'll never have enough."
  },
  {
    "title": "If you look at what you have in life, you'll always have more. If you look at what you don't have in life, you'll never have enough.",
    "content": "If you look at what you have in life, you'll always have more. If you look at what you don't have in life, you'll never have enough."
  },
  {
    "title": "Jagged Winter Trail Designs",
    "content": "The wagon and mule, Time and Eternity, stop to change places. Their lean and slope-back shadow, my reservation. The moon moves like infested flour. At the river, bloody victories meet bloody massacres. They tell each other about their dead.\nGrandmothers eat buffalo instead of hamburger. After supper, guitar chords bite through gravestone. Then the one grandfather interrupts, walking \noff with his own skull as a lantern into the polar night. Snowshoe hare cleans the ears of the sleeping and leaves prophetic dreams.\nIt is quiet. One can hear the hair of the dead grow. The woods, itself, dressed in frozen children’s clothes. Few of the living disguise themselves as pawned beadwork."
  },
  {
    "title": "Jagged Winter Trail Designs",
    "content": "The wagon and mule, Time and Eternity, stop to change places. Their lean and slope-back shadow, my reservation. The moon moves like infested flour. At the river, bloody victories meet bloody massacres. They tell each other about their dead.\nGrandmothers eat buffalo instead of hamburger. After supper, guitar chords bite through gravestone. Then the one grandfather interrupts, walking \noff with his own skull as a lantern into the polar night. Snowshoe hare cleans the ears of the sleeping and leaves prophetic dreams.\nIt is quiet. One can hear the hair of the dead grow. The woods, itself, dressed in frozen children’s clothes. Few of the living disguise themselves as pawned beadwork."
  },
  {
    "title": "First Snow",
    "content": "A rabbit has stopped on the gravel driveway:\nimbibing the silence,\nyou stare at spruce needles:\nthere's no sound of a leaf blower, \nno sign of a black bear;\na few weeks ago, a buck scraped his rack\nagainst an aspen trunk;\na carpenter scribed a plank along a curved stone wall.\nYou only spot the rabbit's ears and tail:\nwhen it moves, you locate it against speckled gravel,\nbut when it stops, it blends in again;\nthe world of being is like this gravel:\nyou think you own a car, a house,\nthis blue-zigzagged shirt, but you just borrow these things. \nYesterday, you constructed an aqueduct of dreams\nand stood at Gibraltar,\nbut you possess nothing.\nSnow melts into a pool of clear water;\nand, in this stillness,\nstarlight behind daylight wherever you gaze."
  },
  {
    "title": "First Snow",
    "content": "A rabbit has stopped on the gravel driveway:\nimbibing the silence,\nyou stare at spruce needles:\nthere's no sound of a leaf blower, \nno sign of a black bear;\na few weeks ago, a buck scraped his rack\nagainst an aspen trunk;\na carpenter scribed a plank along a curved stone wall.\nYou only spot the rabbit's ears and tail:\nwhen it moves, you locate it against speckled gravel,\nbut when it stops, it blends in again;\nthe world of being is like this gravel:\nyou think you own a car, a house,\nthis blue-zigzagged shirt, but you just borrow these things. \nYesterday, you constructed an aqueduct of dreams\nand stood at Gibraltar,\nbut you possess nothing.\nSnow melts into a pool of clear water;\nand, in this stillness,\nstarlight behind daylight wherever you gaze."
  },
  {
    "title": "Fragments of Bone and Ice",
    "content": "One of the first experiments we give children teaches the three states of water: liquid, vapor, and ICE at the border storing children in *hieleras,*  short-term detention facilities known as iceboxes because it’s so cold you can see your breath as it transforms from vapor into liquid and ice.*Why?*  a child on the floor asks.\nOur bodies are mostly water and the water inside them is the same temperature as our bodies, around 98.6 degrees, but the icebox is much colder so when a child exhales a warm, saturated breath, it becomes dew, and when it is cooled even further, condenses to minuscule droplets of liquid and ice, and this, child, is the cloud we see.\nSome children are given two apples a day, which helps them keep time.\nWhen it comes to the human bones, it’s hard not to admire the rib cage that holds my heart like it’s an animal.\nStill, if I had to name just one favorite, I’m torn between the hip and the jaw.\nImagine the invention of the wheel and then the waterwheel, the color wheel, the spinning wheel for turning threads into blankets.\nNext lesson: there are five basic needs—water, air, food, sleep, shelter.\nI admire the moving parts.\nThe evolution of the hip decoupled walking from breathing so we can run at sunset toward each other or away from fire.\nThe bones of the hips are winged; if I flashed a picture quickly before you like pornography, you might mistake it for an emperor moth, which is one way to enter the world, headfirst through a body attracted to light.\nThe history of hips frees the hands for holding a baby, rocking a baby, holding your child’s eyes near your eyes at the distance the eyes first can see.\nThe jawbone gives us each a face."
  },
  {
    "title": "Fragments of Bone and Ice",
    "content": "One of the first experiments we give children teaches the three states of water: liquid, vapor, and ICE at the border storing children in *hieleras,*  short-term detention facilities known as iceboxes because it’s so cold you can see your breath as it transforms from vapor into liquid and ice.*Why?*  a child on the floor asks.\nOur bodies are mostly water and the water inside them is the same temperature as our bodies, around 98.6 degrees, but the icebox is much colder so when a child exhales a warm, saturated breath, it becomes dew, and when it is cooled even further, condenses to minuscule droplets of liquid and ice, and this, child, is the cloud we see.\nSome children are given two apples a day, which helps them keep time.\nWhen it comes to the human bones, it’s hard not to admire the rib cage that holds my heart like it’s an animal.\nStill, if I had to name just one favorite, I’m torn between the hip and the jaw.\nImagine the invention of the wheel and then the waterwheel, the color wheel, the spinning wheel for turning threads into blankets.\nNext lesson: there are five basic needs—water, air, food, sleep, shelter.\nI admire the moving parts.\nThe evolution of the hip decoupled walking from breathing so we can run at sunset toward each other or away from fire.\nThe bones of the hips are winged; if I flashed a picture quickly before you like pornography, you might mistake it for an emperor moth, which is one way to enter the world, headfirst through a body attracted to light.\nThe history of hips frees the hands for holding a baby, rocking a baby, holding your child’s eyes near your eyes at the distance the eyes first can see.\nThe jawbone gives us each a face."
  },
  {
    "title": "The Burning",
    "content": "It was the hard winter she came,\nfrozen larks plummeting through the gloam like falling stars,\neach pail in the yard a slattern’s looking glass.\nEach dusk, the house cobwebbed by creeping frost,\nmy husband slipped like a knife from an oyster,\nmy sons nestled like dormice in their cots,\nI stood at my black window and oh\nthe cold it pressed upon me like a lover,\nheld its hands to my throat, my knees.\nShe came first through the trees:\na small glint amongst the poplars,\nhoarfrost dripping from the velvet nubs of their antlers,\nleaping fast to a shuddering pillar of flame,\nher pelvis a cradle of jeweled tinder,\nher ribs white kindling. A holy thing—\nsuch furious unblossoming—and something profane.\nI pressed my eye to the glass, the crackling dark,\nsaw her heart catch light,\nblackbirds flap frantic from the forks of trees—\n    —woke shivering, sweat between my breasts,\nmy tongue in my teeth.\nEvery night then she came\nin the stolen hours between caring and dream,\nthe children vanished, the drudging chaos of day\nput to sleep.\nI have no words to tell of the shapes she scorched,\nthe frozen lock, the copper key,\nbut that heat licked me raw as a wild love,\ncracked the ice on my ribs and tossed in a flare.\nAll my life I have been a good woman,\ncompliant, neat, my children’s snow boots polished,\neach snowflake of ash swept clean from my step.\nI’ve worn obedience like a uniform,\nthe hoof of the iron cooling in my grate.\nYet I riled in the witching hour, tongue glittering.\nMy darling, I whispered to my own dry bones,\nfor what do you burn?\nThree moons she has been absent,\nthough I wait at my window, the chill persisting, presaging snow,\nand my longing rises hopeless as the carp in the pool.\nI don’t know where she is living\nor if she lives at all—\nwith women nursing in fevered sheets\nor scrubbing floors until their knuckles ignite?\nBut by dark, when my sons sail the black cut\nof sleep, and frost lays its terrible lace\nupon the grass, when I am alone with my fretting,\nwith my dreams like black pearls in the clam of my mouth,\nI press my fists to that tenderest wound—my soul—\nand Christ how I burn."
  },
  {
    "title": "The Burning",
    "content": "It was the hard winter she came,\nfrozen larks plummeting through the gloam like falling stars,\neach pail in the yard a slattern’s looking glass.\nEach dusk, the house cobwebbed by creeping frost,\nmy husband slipped like a knife from an oyster,\nmy sons nestled like dormice in their cots,\nI stood at my black window and oh\nthe cold it pressed upon me like a lover,\nheld its hands to my throat, my knees.\nShe came first through the trees:\na small glint amongst the poplars,\nhoarfrost dripping from the velvet nubs of their antlers,\nleaping fast to a shuddering pillar of flame,\nher pelvis a cradle of jeweled tinder,\nher ribs white kindling. A holy thing—\nsuch furious unblossoming—and something profane.\nI pressed my eye to the glass, the crackling dark,\nsaw her heart catch light,\nblackbirds flap frantic from the forks of trees—\n    —woke shivering, sweat between my breasts,\nmy tongue in my teeth.\nEvery night then she came\nin the stolen hours between caring and dream,\nthe children vanished, the drudging chaos of day\nput to sleep.\nI have no words to tell of the shapes she scorched,\nthe frozen lock, the copper key,\nbut that heat licked me raw as a wild love,\ncracked the ice on my ribs and tossed in a flare.\nAll my life I have been a good woman,\ncompliant, neat, my children’s snow boots polished,\neach snowflake of ash swept clean from my step.\nI’ve worn obedience like a uniform,\nthe hoof of the iron cooling in my grate.\nYet I riled in the witching hour, tongue glittering.\nMy darling, I whispered to my own dry bones,\nfor what do you burn?\nThree moons she has been absent,\nthough I wait at my window, the chill persisting, presaging snow,\nand my longing rises hopeless as the carp in the pool.\nI don’t know where she is living\nor if she lives at all—\nwith women nursing in fevered sheets\nor scrubbing floors until their knuckles ignite?\nBut by dark, when my sons sail the black cut\nof sleep, and frost lays its terrible lace\nupon the grass, when I am alone with my fretting,\nwith my dreams like black pearls in the clam of my mouth,\nI press my fists to that tenderest wound—my soul—\nand Christ how I burn."
  },
  {
    "title": "Booker T. and W.E.B.",
    "content": "“It seems to me,” said Booker T.,\n“It shows a mighty lot of cheek\nTo study chemistry and Greek\nWhen Mister Charlie needs a hand\nTo hoe the cotton on his land,\nAnd when Miss Ann looks for a cook,\nWhy stick your nose inside a book?”\n“I don’t agree,” said W.E.B.,\n“If I should have the drive to seek\nKnowledge of chemistry or Greek,\nI’ll do it. Charles and Miss can look\nAnother place for hand or cook.\nSome men rejoice in skill of hand,\nAnd some in cultivating land,\nBut there are others who maintain\nThe right to cultivate the brain.”\n“It seems to me,” said Booker T.,\n“That all you folks have missed the boat\nWho shout about the right to vote,\nAnd spend vain days and sleepless nights\nIn uproar over civil rights.\nJust keep your mouths shut, do not grouse,\nBut work, and save, and buy a house.”\n“I don’t agree,” said W.E.B.,\n“For what can property avail\nIf dignity and justice fail.\nUnless you help to make the laws,\nThey’ll steal your house with trumped-up clause.\nA rope’s as tight, a fire as hot,\nNo matter how much cash you’ve got.\nSpeak soft, and try your little plan,\nBut as for me, I’ll be a man.”\n“It seems to me,” said Booker T.—\n“I don’t agree,”\nSaid W.E.B."
  },
  {
    "title": "Booker T. and W.E.B.",
    "content": "“It seems to me,” said Booker T.,\n“It shows a mighty lot of cheek\nTo study chemistry and Greek\nWhen Mister Charlie needs a hand\nTo hoe the cotton on his land,\nAnd when Miss Ann looks for a cook,\nWhy stick your nose inside a book?”\n“I don’t agree,” said W.E.B.,\n“If I should have the drive to seek\nKnowledge of chemistry or Greek,\nI’ll do it. Charles and Miss can look\nAnother place for hand or cook.\nSome men rejoice in skill of hand,\nAnd some in cultivating land,\nBut there are others who maintain\nThe right to cultivate the brain.”\n“It seems to me,” said Booker T.,\n“That all you folks have missed the boat\nWho shout about the right to vote,\nAnd spend vain days and sleepless nights\nIn uproar over civil rights.\nJust keep your mouths shut, do not grouse,\nBut work, and save, and buy a house.”\n“I don’t agree,” said W.E.B.,\n“For what can property avail\nIf dignity and justice fail.\nUnless you help to make the laws,\nThey’ll steal your house with trumped-up clause.\nA rope’s as tight, a fire as hot,\nNo matter how much cash you’ve got.\nSpeak soft, and try your little plan,\nBut as for me, I’ll be a man.”\n“It seems to me,” said Booker T.—\n“I don’t agree,”\nSaid W.E.B."
  },
  {
    "title": "Anyone can get dressed up and look glamorous but it is how people dress in their days off that are the most intriguing",
    "content": "Anyone can get dressed up and look glamorous but it is how people dress in their days off that are the most intriguing"
  },
  {
    "title": "Anyone can get dressed up and look glamorous but it is how people dress in their days off that are the most intriguing",
    "content": "Anyone can get dressed up and look glamorous but it is how people dress in their days off that are the most intriguing"
  },
  {
    "title": "I, Too",
    "content": "I, too, sing America.\nI am the darker brother.\nThey send me to eat in the kitchen\nWhen company comes,\nBut I laugh,\nAnd eat well,\nAnd grow strong.\nTomorrow,\nI’ll be at the table\nWhen company comes.\nNobody’ll dare\nSay to me,\n“Eat in the kitchen,”\nThen.\nBesides,\nThey’ll see how beautiful I am\nAnd be ashamed—\nI, too, am America."
  },
  {
    "title": "I, Too",
    "content": "I, too, sing America.\nI am the darker brother.\nThey send me to eat in the kitchen\nWhen company comes,\nBut I laugh,\nAnd eat well,\nAnd grow strong.\nTomorrow,\nI’ll be at the table\nWhen company comes.\nNobody’ll dare\nSay to me,\n“Eat in the kitchen,”\nThen.\nBesides,\nThey’ll see how beautiful I am\nAnd be ashamed—\nI, too, am America."
  },
  {
    "title": "Invictus",
    "content": "Out of the night that covers me,\n      Black as the pit from pole to pole,\nI thank whatever gods may be\n      For my unconquerable soul.\nIn the fell clutch of circumstance\n      I have not winced nor cried aloud.\nUnder the bludgeonings of chance\n      My head is bloody, but unbowed.\nBeyond this place of wrath and tears\n      Looms but the Horror of the shade,\nAnd yet the menace of the years\n      Finds and shall find me unafraid.\nIt matters not how strait the gate,\n      How charged with punishments the scroll,\nI am the master of my fate,\n      I am the captain of my soul."
  },
  {
    "title": "Invictus",
    "content": "Out of the night that covers me,\n      Black as the pit from pole to pole,\nI thank whatever gods may be\n      For my unconquerable soul.\nIn the fell clutch of circumstance\n      I have not winced nor cried aloud.\nUnder the bludgeonings of chance\n      My head is bloody, but unbowed.\nBeyond this place of wrath and tears\n      Looms but the Horror of the shade,\nAnd yet the menace of the years\n      Finds and shall find me unafraid.\nIt matters not how strait the gate,\n      How charged with punishments the scroll,\nI am the master of my fate,\n      I am the captain of my soul."
  },
  {
    "title": "This Beginning May Have Always Meant This End",
    "content": "Coming from a place where we meandered mornings and met quail, scrub jay, mockingbird, i knew coyote, like everyone else, i knew \ncactus, knew tumbleweed, lichen on the rocks and pill bugs beneath, rattlers sometimes, the soft smell of sage and the ferment of cactus pear. coming from this place, from a place where grass might grow greener on the hillside in winter than in any yard, where, the whole rest of the year, everything i loved, chaparral pea, bottle brush tree, jacaranda, mariposa, pinyon and desert oak, the kumquat in the back garden and wisteria vining the porch, the dry grass whispering long after the last rains, raccoons in and out of the hills, trash hurled by the hottest wind, the dry grass tall now and golden, lawn chairs, \neucalyptus, everything, in a place we knew, every thing, we knew, little and large and mine and ours, except horror, all of it, everything could flame up that quickly, could flare and be gone."
  },
  {
    "title": "This Beginning May Have Always Meant This End",
    "content": "Coming from a place where we meandered mornings and met quail, scrub jay, mockingbird, i knew coyote, like everyone else, i knew \ncactus, knew tumbleweed, lichen on the rocks and pill bugs beneath, rattlers sometimes, the soft smell of sage and the ferment of cactus pear. coming from this place, from a place where grass might grow greener on the hillside in winter than in any yard, where, the whole rest of the year, everything i loved, chaparral pea, bottle brush tree, jacaranda, mariposa, pinyon and desert oak, the kumquat in the back garden and wisteria vining the porch, the dry grass whispering long after the last rains, raccoons in and out of the hills, trash hurled by the hottest wind, the dry grass tall now and golden, lawn chairs, \neucalyptus, everything, in a place we knew, every thing, we knew, little and large and mine and ours, except horror, all of it, everything could flame up that quickly, could flare and be gone."
  },
  {
    "title": "Jagged Winter Trail Designs",
    "content": "The wagon and mule, Time and Eternity, stop to change places. Their lean and slope-back shadow, my reservation. The moon moves like infested flour. At the river, bloody victories meet bloody massacres. They tell each other about their dead.\nGrandmothers eat buffalo instead of hamburger. After supper, guitar chords bite through gravestone. Then the one grandfather interrupts, walking \noff with his own skull as a lantern into the polar night. Snowshoe hare cleans the ears of the sleeping and leaves prophetic dreams.\nIt is quiet. One can hear the hair of the dead grow. The woods, itself, dressed in frozen children’s clothes. Few of the living disguise themselves as pawned beadwork."
  },
  {
    "title": "Jagged Winter Trail Designs",
    "content": "The wagon and mule, Time and Eternity, stop to change places. Their lean and slope-back shadow, my reservation. The moon moves like infested flour. At the river, bloody victories meet bloody massacres. They tell each other about their dead.\nGrandmothers eat buffalo instead of hamburger. After supper, guitar chords bite through gravestone. Then the one grandfather interrupts, walking \noff with his own skull as a lantern into the polar night. Snowshoe hare cleans the ears of the sleeping and leaves prophetic dreams.\nIt is quiet. One can hear the hair of the dead grow. The woods, itself, dressed in frozen children’s clothes. Few of the living disguise themselves as pawned beadwork."
  },
  {
    "title": "Fragments of Bone and Ice",
    "content": "One of the first experiments we give children teaches the three states of water: liquid, vapor, and ICE at the border storing children in *hieleras,*  short-term detention facilities known as iceboxes because it’s so cold you can see your breath as it transforms from vapor into liquid and ice.*Why?*  a child on the floor asks.\nOur bodies are mostly water and the water inside them is the same temperature as our bodies, around 98.6 degrees, but the icebox is much colder so when a child exhales a warm, saturated breath, it becomes dew, and when it is cooled even further, condenses to minuscule droplets of liquid and ice, and this, child, is the cloud we see.\nSome children are given two apples a day, which helps them keep time.\nWhen it comes to the human bones, it’s hard not to admire the rib cage that holds my heart like it’s an animal.\nStill, if I had to name just one favorite, I’m torn between the hip and the jaw.\nImagine the invention of the wheel and then the waterwheel, the color wheel, the spinning wheel for turning threads into blankets.\nNext lesson: there are five basic needs—water, air, food, sleep, shelter.\nI admire the moving parts.\nThe evolution of the hip decoupled walking from breathing so we can run at sunset toward each other or away from fire.\nThe bones of the hips are winged; if I flashed a picture quickly before you like pornography, you might mistake it for an emperor moth, which is one way to enter the world, headfirst through a body attracted to light.\nThe history of hips frees the hands for holding a baby, rocking a baby, holding your child’s eyes near your eyes at the distance the eyes first can see.\nThe jawbone gives us each a face."
  },
  {
    "title": "Fragments of Bone and Ice",
    "content": "One of the first experiments we give children teaches the three states of water: liquid, vapor, and ICE at the border storing children in *hieleras,*  short-term detention facilities known as iceboxes because it’s so cold you can see your breath as it transforms from vapor into liquid and ice.*Why?*  a child on the floor asks.\nOur bodies are mostly water and the water inside them is the same temperature as our bodies, around 98.6 degrees, but the icebox is much colder so when a child exhales a warm, saturated breath, it becomes dew, and when it is cooled even further, condenses to minuscule droplets of liquid and ice, and this, child, is the cloud we see.\nSome children are given two apples a day, which helps them keep time.\nWhen it comes to the human bones, it’s hard not to admire the rib cage that holds my heart like it’s an animal.\nStill, if I had to name just one favorite, I’m torn between the hip and the jaw.\nImagine the invention of the wheel and then the waterwheel, the color wheel, the spinning wheel for turning threads into blankets.\nNext lesson: there are five basic needs—water, air, food, sleep, shelter.\nI admire the moving parts.\nThe evolution of the hip decoupled walking from breathing so we can run at sunset toward each other or away from fire.\nThe bones of the hips are winged; if I flashed a picture quickly before you like pornography, you might mistake it for an emperor moth, which is one way to enter the world, headfirst through a body attracted to light.\nThe history of hips frees the hands for holding a baby, rocking a baby, holding your child’s eyes near your eyes at the distance the eyes first can see.\nThe jawbone gives us each a face."
  },
  {
    "title": "The Burning",
    "content": "It was the hard winter she came,\nfrozen larks plummeting through the gloam like falling stars,\neach pail in the yard a slattern’s looking glass.\nEach dusk, the house cobwebbed by creeping frost,\nmy husband slipped like a knife from an oyster,\nmy sons nestled like dormice in their cots,\nI stood at my black window and oh\nthe cold it pressed upon me like a lover,\nheld its hands to my throat, my knees.\nShe came first through the trees:\na small glint amongst the poplars,\nhoarfrost dripping from the velvet nubs of their antlers,\nleaping fast to a shuddering pillar of flame,\nher pelvis a cradle of jeweled tinder,\nher ribs white kindling. A holy thing—\nsuch furious unblossoming—and something profane.\nI pressed my eye to the glass, the crackling dark,\nsaw her heart catch light,\nblackbirds flap frantic from the forks of trees—\n    —woke shivering, sweat between my breasts,\nmy tongue in my teeth.\nEvery night then she came\nin the stolen hours between caring and dream,\nthe children vanished, the drudging chaos of day\nput to sleep.\nI have no words to tell of the shapes she scorched,\nthe frozen lock, the copper key,\nbut that heat licked me raw as a wild love,\ncracked the ice on my ribs and tossed in a flare.\nAll my life I have been a good woman,\ncompliant, neat, my children’s snow boots polished,\neach snowflake of ash swept clean from my step.\nI’ve worn obedience like a uniform,\nthe hoof of the iron cooling in my grate.\nYet I riled in the witching hour, tongue glittering.\nMy darling, I whispered to my own dry bones,\nfor what do you burn?\nThree moons she has been absent,\nthough I wait at my window, the chill persisting, presaging snow,\nand my longing rises hopeless as the carp in the pool.\nI don’t know where she is living\nor if she lives at all—\nwith women nursing in fevered sheets\nor scrubbing floors until their knuckles ignite?\nBut by dark, when my sons sail the black cut\nof sleep, and frost lays its terrible lace\nupon the grass, when I am alone with my fretting,\nwith my dreams like black pearls in the clam of my mouth,\nI press my fists to that tenderest wound—my soul—\nand Christ how I burn."
  },
  {
    "title": "The Burning",
    "content": "It was the hard winter she came,\nfrozen larks plummeting through the gloam like falling stars,\neach pail in the yard a slattern’s looking glass.\nEach dusk, the house cobwebbed by creeping frost,\nmy husband slipped like a knife from an oyster,\nmy sons nestled like dormice in their cots,\nI stood at my black window and oh\nthe cold it pressed upon me like a lover,\nheld its hands to my throat, my knees.\nShe came first through the trees:\na small glint amongst the poplars,\nhoarfrost dripping from the velvet nubs of their antlers,\nleaping fast to a shuddering pillar of flame,\nher pelvis a cradle of jeweled tinder,\nher ribs white kindling. A holy thing—\nsuch furious unblossoming—and something profane.\nI pressed my eye to the glass, the crackling dark,\nsaw her heart catch light,\nblackbirds flap frantic from the forks of trees—\n    —woke shivering, sweat between my breasts,\nmy tongue in my teeth.\nEvery night then she came\nin the stolen hours between caring and dream,\nthe children vanished, the drudging chaos of day\nput to sleep.\nI have no words to tell of the shapes she scorched,\nthe frozen lock, the copper key,\nbut that heat licked me raw as a wild love,\ncracked the ice on my ribs and tossed in a flare.\nAll my life I have been a good woman,\ncompliant, neat, my children’s snow boots polished,\neach snowflake of ash swept clean from my step.\nI’ve worn obedience like a uniform,\nthe hoof of the iron cooling in my grate.\nYet I riled in the witching hour, tongue glittering.\nMy darling, I whispered to my own dry bones,\nfor what do you burn?\nThree moons she has been absent,\nthough I wait at my window, the chill persisting, presaging snow,\nand my longing rises hopeless as the carp in the pool.\nI don’t know where she is living\nor if she lives at all—\nwith women nursing in fevered sheets\nor scrubbing floors until their knuckles ignite?\nBut by dark, when my sons sail the black cut\nof sleep, and frost lays its terrible lace\nupon the grass, when I am alone with my fretting,\nwith my dreams like black pearls in the clam of my mouth,\nI press my fists to that tenderest wound—my soul—\nand Christ how I burn."
  },
  {
    "title": "Invictus",
    "content": "Out of the night that covers me,\n      Black as the pit from pole to pole,\nI thank whatever gods may be\n      For my unconquerable soul.\nIn the fell clutch of circumstance\n      I have not winced nor cried aloud.\nUnder the bludgeonings of chance\n      My head is bloody, but unbowed.\nBeyond this place of wrath and tears\n      Looms but the Horror of the shade,\nAnd yet the menace of the years\n      Finds and shall find me unafraid.\nIt matters not how strait the gate,\n      How charged with punishments the scroll,\nI am the master of my fate,\n      I am the captain of my soul."
  },
  {
    "title": "Invictus",
    "content": "Out of the night that covers me,\n      Black as the pit from pole to pole,\nI thank whatever gods may be\n      For my unconquerable soul.\nIn the fell clutch of circumstance\n      I have not winced nor cried aloud.\nUnder the bludgeonings of chance\n      My head is bloody, but unbowed.\nBeyond this place of wrath and tears\n      Looms but the Horror of the shade,\nAnd yet the menace of the years\n      Finds and shall find me unafraid.\nIt matters not how strait the gate,\n      How charged with punishments the scroll,\nI am the master of my fate,\n      I am the captain of my soul."
  }
];

// Render all poem previews
poems.forEach(poem => {
    const block = document.createElement('div');
    block.className = 'preview-block';

    const lines = poem.content.split('\n');
    const previewContent = lines.slice(0, PREVIEW_LINES).join('\n');
    const isTruncated = lines.length > PREVIEW_LINES;

    const previewText = document.createElement('div');
    previewText.className = 'preview-text';
    previewText.textContent = previewContent;

    block.appendChild(previewText);

    if (isTruncated) {
        const readMoreBtn = document.createElement('button');
        readMoreBtn.className = 'read-more-btn';
        readMoreBtn.textContent = 'Read More';

        readMoreBtn.addEventListener('click', () => {
            modalFullText.textContent = poem.content;
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevent background scroll
        });

        block.appendChild(readMoreBtn);
    }

    container.appendChild(block);
});

// Close modal
closeModalBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = ''; // Re-enable scroll
});

// Close modal if user clicks outside content
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
});

// Optional: Close with ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'block') {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
});
