class Item{
    constructor(material, displayName, name, rarity, itemType, lore){
        this.material = material;
        this.displayName = displayName;
        this.name = name;
        this.rarity = rarity;
        this.itemType = itemType;
        this.lore = lore;
        this.javaCode;
    }
    edit(material, displayName, name, rarity, itemType, lore){
        this.material = material;
        this.displayName = displayName;
        this.name = name;
        this.rarity = rarity;
        this.itemType = itemType;
        this.lore = lore;
    }
    toJava(){
        let completedLore = "";
        for(let i = 0; i < this.lore.length; i++){
            completedLore += 'lore.add(ChatColor.translateAlternateColorCodes(\'&\', "' + this.lore[i] + '"));\n        ';
        }
        completedLore += 'lore.add("' + this.rarity + " " + this.itemType.toUpperCase() + '");\n';

        let javaCode = `
        ItemStack item = new ItemStack(Material.` + this.material.toUpperCase() + `, 1);
        ItemMeta meta = item.getItemMeta();
        meta.setDisplayName("ChatColor.translateAlternateColorCodes('&', "` + this.displayName + `"));
        meta.setUnbreakable(true);
        meta.addItemFlags(ItemFlag.HIDE_UNBREAKABLE);
        List<String> lore = new ArrayList<>();

        ` + completedLore + `
        meta.setLore(lore);
        item.setItemMeta(meta);
        ` + this.name + ` = item;
        customItems.add(ChatColor.translateAlternateColorCodes('&', "` + this.displayName + `"));
    `
        return javaCode;
    }
}

const result = document.getElementById("generated");
let material = document.getElementById("Material").value;
let displayName = document.getElementById("DisplayName").value;
let namee = document.getElementById("Name").value;
let rarity = document.getElementById("Rarity").value;
let itemType = document.getElementById("type").value;
let lore = document.getElementById("lore").value.split(";");

let item = new Item(material, displayName, namee, rarity, itemType, lore);

window.onload = () => {
    result.innerHTML = item.toJava();
}

function refresh(){
    material = document.getElementById("Material").value;
    displayName = document.getElementById("DisplayName").value;
    namee = document.getElementById("Name").value;
    rarity = document.getElementById("Rarity").value;
    itemType = document.getElementById("type").value;
    lore = document.getElementById("lore").value.split("\n");

    item.edit(material, displayName, namee, rarity, itemType, lore);

    result.innerHTML = item.toJava();
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}