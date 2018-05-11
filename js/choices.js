document.modules = document.modules || {};
document.modules.util = document.modules.util || {};
(function(ns) {
    ns.Chooser = function(url, output) {
        this.choose = function(attr) {
            let ch = 'null';
            while (ch === 'null') {
                let n = this.choices.length;
                let i = Math.floor(Math.random() * n);
                ch = this.choices[i][attr];
            }
            return ch
        };
        this.getChoice = function() {
            let result = {};
            for (let i = 0; i < this.choice_attrs.length; i++) {
                let attr = this.choice_attrs[i];
                result[attr] = this.choose(attr);
            }
            return result;
        };
        this.renderChoice = function() {
            let result = this.getChoice();
            for (let i = 0; i < this.choice_attrs.length; i++) {
                let attr = this.choice_attrs[i];
                let r = this.renderers[attr];
                if (r) {
                    r(attr, result[attr]); 
                }
            }
        };
        this.addRenderer = function(attr) {
            let attrDiv = document.createElement('div');
            attrDiv.classList.add('chooser-attr-output-div');
            let attrTn = document.createTextNode('');
            attrDiv.appendChild(attrTn);
            let valueDiv = document.createElement('div');
            valueDiv.classList.add('chooser-value-output-div');
            let valueTn = document.createTextNode('');
            valueDiv.appendChild(valueTn);
            this.output.appendChild(attrDiv);
            this.output.appendChild(valueDiv);
            
            this.renderers[attr] = function(attr, value) {
                attrTn.nodeValue = attr + ':';
                valueTn.nodeValue = value;
            }
        };
        this.setChoices = function(choices) {
            this.choices = choices;
            this.choice_attrs = Object.keys(choices[0]);
            for (let i = 0; i < this.choice_attrs.length; i++) {
                this.addRenderer(this.choice_attrs[i]);
            }
        };

        this.output = output;
        this.renderers = {};
        this.setChoices([{}]);
        console.log('a');
        this.promise = d3.csv(url).then(choices => {
            console.log('b');
            this.setChoices(choices);
            return this;
        });
    }
})(document.modules.util);
