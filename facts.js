const APP_VERSION = "1.5";

/* 
PASTE NEW FACTS ONLY INSIDE rawData
FORMAT:
Category<TAB>Title<TAB>Fact<TAB>Location
*/

const rawData = `
Zacapa Social	Street Soccer	Children frequently play soccer in neighborhood streets	Zacapa City
Zacapa Religion	Sunday Services	Sunday morning church services are a weekly tradition	Zacapa Department
Zacapa Food	Homemade Cheese	Local farmers produce simple fresh white cheese	Zacapa Region
Zacapa Weather	Intense Sunlight	The region experiences strong sunlight requiring hats and shade	Zacapa Department
Zacapa Markets	Weekly Animal Markets	Some towns host markets where livestock are bought and sold	Zacapa Region
Zacapa Community	Block Parties	Neighborhood celebrations often include music food and dancing	Zacapa City
Zacapa Health	Heat Awareness	Residents take midday breaks to avoid extreme afternoon heat	Zacapa Department
Zacapa Transportation	Bicycle Use	Bicycles remain a common low cost transportation option	Zacapa Department
Zacapa Tourism	Local River Bridges	Small bridges cross seasonal rivers and offer scenic rural views	Zacapa Region
Culture	Traditional Marimba	The marimba is considered Guatemala’s national instrument and is commonly played during celebrations.	Guatemala City
History	Spanish Conquest	Pedro de Alvarado led the Spanish conquest of Guatemala in the 1520s.	Guatemala
Geography	Volcano Country	Guatemala has more than 30 volcanoes across the country.	Guatemala
Zacapa	Local Cuisine	Yuca con chicharrón is a popular traditional dish found in Zacapa.	Zacapa
Religion	Catholic Heritage	Catholicism has historically been the dominant religion in Guatemala.	Guatemala
Nature	Tikal Jungle	Tikal is surrounded by dense rainforest filled with wildlife.	Tikal
City Facts	Capital Growth	Guatemala City is the largest city in Central America by population.	Guatemala City
Economy	Coffee Exporter	Guatemala is one of the world’s top producers of high-quality coffee.	Guatemala
Wildlife	Quetzal Bird	The resplendent quetzal is Guatemala’s national bird.	Guatemala
History	Civil War Period	Guatemala experienced a civil war lasting from 1960 to 1996.	Guatemala
Culture	Textiles	Traditional Mayan textiles use bright colors and symbolic patterns.	Guatemala
Travel	Lake Atitlán	Lake Atitlán is surrounded by volcanoes and traditional villages.	Lake Atitlan
Zacapa	Hot Climate	Zacapa is known as one of the hottest regions in Guatemala.	Zacapa
Religion	Evangelical Growth	Evangelical Christianity has grown rapidly in recent decades.	Guatemala
Food	Tamales	Colorful Guatemalan tamales are often wrapped in banana leaves.	Guatemala
Language	Mayan Languages	More than 20 Mayan languages are spoken in Guatemala.	Guatemala
Sports	Soccer Popularity	Soccer is the most popular sport in Guatemala.	Guatemala City
Geography	Motagua River	The Motagua River runs near Zacapa and is one of Guatemala’s longest rivers.	Zacapa
Economy	Zacapa Rum	Zacapa is famous internationally for premium rum production.	Zacapa
Culture	Kite Festival	Giant kites are flown during All Saints’ Day celebrations.	Sumpango
History	Ancient Maya	The Maya civilization thrived in Guatemala thousands of years ago.	Tikal
Travel	Antigua Streets	Antigua Guatemala is famous for its cobblestone streets.	Antigua
Nature	Pacaya Volcano	Pacaya is one of Guatemala’s most active volcanoes.	Pacaya
Food	Pepian	Pepian is one of Guatemala’s national stews.	Guatemala
City Facts	Zones System	Guatemala City is divided into numbered zones for navigation.	Guatemala City
Zacapa	Agriculture	Zacapa grows melons, tobacco, and cattle products.	Zacapa
Religion	Processions	Semana Santa processions in Guatemala are world-famous.	Antigua
Wildlife	Jaguars	Jaguars still live in remote jungle regions of Guatemala.	Peten
Culture	Colorful Buses	Chicken buses are brightly painted former U.S. school buses.	Guatemala
History	Independence	Guatemala gained independence from Spain in 1821.	Guatemala City
Geography	Highlands	The western highlands are known for mountains and indigenous culture.	Quetzaltenango
Food	Plantains	Fried plantains are a common side dish.	Guatemala
Travel	Markets	Chichicastenango hosts one of the largest markets in Central America.	Chichicastenango
City Facts	Metro Buses	Guatemala City operates a rapid transit bus system.	Guatemala City
Zacapa	Mountain Views	Zacapa offers scenic mountain and valley landscapes.	Zacapa
Religion	Mission Work	Many international mission teams serve throughout Guatemala annually.	Guatemala
Nature	Caves	Guatemala has extensive cave systems used by ancient Maya.	Coban
History	Colonial Churches	Many colonial churches still stand across the country.	Antigua
Culture	Dance Traditions	Folk dances tell stories of history and local legends.	Guatemala
Economy	Textile Markets	Textile handicrafts are an important economic activity.	Solola
Geography	Rio Dulce	Rio Dulce connects Lake Izabal to the Caribbean Sea.	Rio Dulce
Nature	Lake Izabal	Lake Izabal is the largest lake in Guatemala.	Izabal
History	Castillo de San Felipe	This Spanish fort protected against pirate attacks.	Rio Dulce
Zacapa	Dry Corridor	Zacapa lies within Central America’s dry corridor region.	Zacapa
Food	Sopa de Res	Beef soup with vegetables is a traditional comfort meal.	Guatemala
`;

/* AUTO BUILD FACTS ARRAY — DO NOT MODIFY BELOW */

const facts = rawData
.trim()
.split("\n")
.map((line, index) => {
  const [category, title, fact, location] = line.split("\t");
  return {
    id: index + 1,
    category,
    title,
    fact,
    location
  };
});
