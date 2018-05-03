document.modules = document.modules || {};
document.modules.util = document.modules.util || {};
(function(ns) {
    ns.Chooser = async function(url) {
        let chooser = {
            choose: function(attr) {
                let n = this.choices.length;
                let i = Math.floor(Math.random() * n);
                return this.choices[i][attr];
            },
            getChoices: function() {
                let result = {};
                for (let i = 0; i < this.choice_attrs.length; i++) {
                    let attr = this.choice_attrs[i];
                    result[attr] = this.choose(attr);
                }
                return result;
            },
            formatChoices: function() {
                let result = this.getChoices();
                let toformat = [];
                for (let i = 0; i < this.choice_attrs.length; i++) {
                    let attr = this.choice_attrs[i];
                    toformat.push(attr);
                    toformat.push(': ');
                    toformat.push(this.choose(attr));
                    toformat.push(', ');
                }
                toformat.pop();
                return toformat.join('');
            }
        };

        let choices = await d3.csv(url)
        chooser.choices = choices;
        chooser.choice_attrs = Object.keys(choices[0]);
        return chooser;
    }
})(document.modules.util);
