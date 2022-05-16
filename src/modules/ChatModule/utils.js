export function update_scrollbar(start_index, item_number, item_array, offset_start, offset_delta) {
    let offset = {};
    offset.x = offset_start.x;
    offset.y = offset_start.y;
    for (let item of item_array) {
        item.setAttribute('visible', "false");
    }
    for (var i = 0; i < item_number && i < item_array.length; i++) {
        item_array[i + start_index].setAttribute('visible', "true");
        item_array[i + start_index].setAttribute('position', { x: offset.x, y: offset.y, z: 0.01 });
        offset.x = offset.x + offset_delta.x;
        offset.y = offset.y + offset_delta.y;
    }
}

export function intersected() {
    this.setAttribute('opacity', '0.5');
}

export function intersectedCleared() {
    this.setAttribute('opacity', '1.0');
}

export function choose_controls() {
    let url = new URL(window.location.href);
    let searchParams = new URLSearchParams(url.search);
    var controls = searchParams.get('controls');
    if (controls == "mouse") {
        document.querySelectorAll('.controllerOnly').forEach(e => e.remove());
    } else if (controls == "controller") {
        document.querySelectorAll('.mouseOnly').forEach(e => e.remove());
    }
}

export function pass_controls() {
    let url = new URL(window.location.href);
    let searchParams = new URLSearchParams(url.search);
    var controls = searchParams.get('controls');
    document.querySelectorAll('[simple-link]').forEach(e => e.components["simple-link"].attrValue.href += ("?controls=" + controls));
}
