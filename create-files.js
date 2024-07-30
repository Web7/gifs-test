const fs = require('fs');
const args = process.argv;

const name = args[2].split('=')[1];
const type = args[3].split('=')[1];

const dir = `./src/components/${type}s/`;

console.log(`Create: ${dir}${name}/${name}.${type}`);

const vue = `<template src="./${name}.${type}.html" lang="html"></template>

    <script src="./${name}.${type}.ts" lang="ts">
    export default {
      name: "${name}-${type}"
    };
    </script>
    
    <style src="./${name}.${type}.sass" lang="sass"></style>
    
    <i18n src="./translations/ru.json" lang="json5" locale="ru"></i18n>
    <i18n src="./translations/en.json" lang="json5" locale="en"></i18n>`;

const ts = `import { Vue } from "vue-class-component";

export default class ${name.charAt(0).toUpperCase()}${name.slice(1)}${type.charAt(0).toUpperCase()}${type.slice(1)} extends Vue {
}`;

const json = `{
  "${name.toUpperCase()}": {}
}`;

const files = [
    {
        name: `${dir}${name}/${name}.${type}.vue`,
        data: vue
    },
    {
        name: `${dir}${name}/${name}.${type}.html`,
        data: ''
    },
    {
        name: `${dir}${name}/${name}.${type}.ts`,
        data: ts
    },
    {
        name: `${dir}${name}/${name}.${type}.sass`,
        data: ''
    },
    {
        name: `${dir}${name}/translations/ru.json`,
        data: json
    },
    {
        name: `${dir}${name}/translations/en.json`,
        data: json
    },
];

if (!fs.existsSync(dir + name)){
    fs.mkdirSync(dir + name, { recursive: true });
}

if (!fs.existsSync(dir + name + '/translations')){
    fs.mkdirSync(dir + name + '/translations', { recursive: true });
}

for (const file of files) {
    fs.writeFileSync(file.name, file.data || '', 'utf8', (error) => {
        console.log(error);
    });
}