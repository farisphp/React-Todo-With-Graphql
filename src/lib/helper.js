export const filterTodos = (array, property, value) => {
    return array?.filter(function (arr) {
        return arr[property] === value
    });
}