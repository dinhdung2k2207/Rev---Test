function firstNonRepeatedCharacter(string) {
    for (var i = 0; i < string.length; i++) {
        var c = string.charAt(i);
        if (string.indexOf(c) == i && string.indexOf(c, i + 1) == -1) {
            return string.indexOf(c);
        }
    }
    return null;
}

var example = 'sseemless';
console.log(firstNonRepeatedCharacter(example));
