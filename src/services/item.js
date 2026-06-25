const { useState } = require("react");
const { default: api } = require("./api")

exports.getItemList = async () => {
    const resp = await api.get('/');
    return resp.data
}

exports.getItemDetailsById = async (id) => {
    const resp = await api.get('/', {params: {id}});
    return resp.data
}

exports.saveItem = async (payload) => {
    const resp = await api.post('/', payload)
    return resp.data;
}

exports.updateItem = async (payload, id) => {
    const resp = await api.put('/', payload, {params: {id}})
    return resp.data;
}