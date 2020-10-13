function Selectoru (arg1, arg2) {
    this.validateElement(arg1).validateOptions(arg2).render();
}

Selectoru.prototype.render = function () {
    this.renderContainer();
};

Selectoru.prototype.renderContainer = function () {
    this.container = document.createElement('div');
    this.container.classList.add('selectoru-conatiner');

    var dropdown = this.renderDropdown(),
        input = this.renderInput();
    this.selectElement.insertAdjacentElement('afterend', this.container);
    this.selectElement.setAttribute('selectoru-initialised', '');

    this.container.appendChild(input);
    this.container.appendChild(dropdown);

    this.dropdown = dropdown;
    this.input = input;
};

Selectoru.prototype.renderDropdown = function () {
    var dropdown = document.createElement('div');
    dropdown.classList.add('selectoru-dropdown');

    this.listData.forEach(function (data) {
        var item = document.createElement('div');
        item.classList.add('selectoru-option');
        item.innerHTML = data.html;
        item.dataset.value = data.value;
        item.dataset.selected = data.selected;
        dropdown.appendChild(item);
    });

    if (this.settings.roundedCorner) {
        dropdown.setAttribute('rounded-corner', '');
    } else {
        dropdown.removeAttribute('rounded-corner');
    }
    return dropdown;
};

Selectoru.prototype.renderDropdownArrow = function () {
    var arrow = document.createElement('div');
    icon = document.createElement('div');
};

Selectoru.prototype.renderInput = function () {
    var holder = document.createElement('div'),
        input = document.createElement('input');

    holder.classList.add('selectoru-input-box');
    input.classList.add('selectoru-input');
    // input.setAttribute('contenteditable', '');

    holder.appendChild(input);

    if (this.settings.roundedCorner) {
        holder.setAttribute('rounded-corner', '');
    } else {
        holder.removeAttribute('rounded-corner');
    }
    return holder;
};

Selectoru.prototype.validateElement = function (param) {
    var element = false, listData = [];
    if (typeof param === 'string' && param.trim().length) {
        param = param.trim();
        if (param.indexOf('.') === -1 && param.indexOf('#') === -1) {
            element = document.getElementById(param);
        } else {
            element = document.querySelector(param);
        }
    } else if (
        typeof param === 'object'
        && param.constructor.toString().indexOf('HTML') > -1
        && param.constructor.toString().indexOf('Element') > -1
    ) {
        element = param;
    }
    if (!element) throw 'The first parameter can be the id or query selector of the HTMLSelectElement or an HTMLSelectElement.';
    if (element.tagName !== 'SELECT') throw 'The element from the first parameter must be an HTMLSelectElement.';
    if (!element.querySelectorAll('option').length) throw 'At least one option is required.';
    this.selectElement = element;

    // Collect option data
    Array.prototype.forEach.call(this.selectElement.querySelectorAll('option'), function (each) {
        listData.push({
            html: each.innerHTML,
            selected: each.selected,
            value: each.value
        });
    });
    this.listData = listData;
    return this;
};

Selectoru.prototype.validateOptions = function (param) {
    // Default settings
    this.settings = {
        maxItems: 1, // Multi-selection if maxItems is set to greater than 1
        roundedCorner: true
    };

    if (typeof param === 'object') {
        // Check options if defined
        if (param.constructor !== Object || !Object.keys(param).length) {
            throw 'The second parameter should be an object and not empty.';
        }
        for (var key in param) {
            var value = param[key];
        }
    }
    return this;
};

HTMLSelectElement.prototype.selectoru = function () {
    new Selectoru(this);
};
