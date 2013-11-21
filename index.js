
/*
 * scopenv - environment variables with any number of prefixes
 *
 * - `variables` - a string or array of variables to retrieve
 * - `[prefixes]` - any number of prefixes may be applied
 */

module.exports = function(variables) {

    // helper function for mapping
    function upper(arg) { return arg.toUpperCase(); }

    // allow sending in just one variable, make them all uppercase
    if (typeof variables === "string") variables = [variables];

    // allow a variable number of prefixes
    var args = Array.prototype.slice.call(arguments, 1).map(upper)
      , len = args.length
      , scopenv = {}
      ;

    // recursive scoping
    function find(variable, depth) {

        if (depth > len) return "";

        // the sauce - right-most prefixes are joined to the variable
        var name = args.slice(0, len - depth).reverse().concat(variable).join("_")
        return process.env[name] || find(variable, ++depth);
    }

    variables.map(upper).forEach(function(variable) {
        scopenv[variable.toLowerCase()] = find(variable, 0);
    });

    return scopenv;
}