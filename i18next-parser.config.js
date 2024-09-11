module.exports = {
    locales: ['en', 'sq'], // Your target languages
    output: 'src/localization/lang/$NAMESPACE.json', // Where to write the JSON files
    input: ['src/**/*.js', 'src/**/*.jsx'], // Your source files
    keySeparator: false, // Use false if your keys are not separated by a dot
    namespaceSeparator: false, // Use false if you do not use namespaces in your keys
    defaultValue: (locale, namespace, key) => key.match(/^(.*(?=::\w*)|.*(?!::\w*))/g)?.[0],
};