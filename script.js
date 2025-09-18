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
    "content": "A rabbit has stopped on the gravel driveway:\nimbibing the silence,\nyou stare at spruce needles:\nthere's no sound of a leaf blower, \nno sign of a black bear;\na few weeks ago, a buck scraped his rack\nagainst an aspen trunk;\na carpenter scribed a plank along a curved stone wall.\nYou only spot the rabbit's ears and tail:\nwhen it moves, you locate it against speckled gravel,\nbut when it stops, it blends in again;\nthe world of being is like this gravel:\nyou think you own a car, a house,\nthis blue-zigzagged shirt, but you just borrow these things. \nYesterday, you constructed an aqueduct of dreams\nand stood at Gibraltar,\nbut
