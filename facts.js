// Guatemalan Facts App - Version 1.2

const categories=[
"First Impressions Guide",
"History & Landmarks",
"Culture & Daily Life",
"Religion & Spirituality",
"Food & Flavors",
"Nature & Geography",
"Practical Etiquette & Tips",
"Common Experiences (What to Expect)"
];

const facts={};

categories.forEach(cat=>{
facts[cat]=[];
});

/* AUTO GENERATE 1000 SAMPLE FACTS
Replace later with your real 500+ Guatemala facts book
*/
let count=1;

while(count<=1000){
const cat=categories[count % categories.length];
facts[cat].push("Guatemala Fact #"+count+" — Sample imported fact placeholder.");
count++;
}
