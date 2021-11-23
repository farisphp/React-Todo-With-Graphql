import React from "react";
import { shallow, mount } from "enzyme";
import { MockedProvider } from '@apollo/client/testing';
import toJson from "enzyme-to-json";
import App from './App';
import ListTodos from "./components/ListTodos";
import Todo from "./components/Todo";
import TodoForm from "./components/TodoForm";
import DeleteTodo from "./components/DeleteTodo";
import { GET_TODOS } from './lib/queries'
import { filterTodos } from './lib/helper'

const data = {
  listTodos: [
    {
        id: "223e0046-f2a1-40ef-99a3-8bde09200299",
        content: "I'm a leaf on the wind. Watch how I soar.",
        status: "BACKLOG",
    },
    {
        id: "d0adb39d-cdf8-469a-8395-a016df0ec221",
        content: "Try add",
        status: "IN_PROGRESS",
    },
    {
        id: "4f69c69a-5145-450a-9a68-51817925ef66",
        content: "Doneee",
        status: "DONE",
    }
  ]
};

const mocks = [
  {
    request: {
      query: GET_TODOS
    },
    result: {
      data
    },
  },
];

const todo = {
  id: "223e0046-f2a1-40ef-99a3-8bde09200299",
  content: "I'm a leaf on the wind. Watch how I soar.",
  status: "BACKLOG",
}

it("renders without crashing", () => {
  mount(
    <MockedProvider mocks={mocks} addTypename={false}>
      <App />
    </MockedProvider>
  );
});

it("renders title", async () => {
  const wrapper = mount(
    <MockedProvider mocks={mocks} addTypename={false}>
      <App />
    </MockedProvider>
  );

  expect(wrapper.contains(<h1 className="font-bold text-lg">TODO APPS</h1>)).toEqual(true);
});

it("renders list todos", () => {
  const wrapper = shallow(
    <ListTodos
      header={<h3 className="py-1 px-2 bg-purple-200 rounded w-max">In Progress</h3>}
      loading={false}
      todos={filterTodos(data?.listTodos, "status", "IN_PROGRESS")}
      error={false}
    />
  )

  expect(wrapper.find({ content: 'Try add' })).toHaveLength(1);
});

it("renders single todo", () => {
  const wrapper = shallow(
    <Todo {...todo}/>
  )

  expect(wrapper.find('p').text()).toEqual("I'm a leaf on the wind. Watch how I soar.");
});

it("add todo", () => {
  const wrapper = mount(
    <MockedProvider mocks={mocks} addTypename={false}>
      <TodoForm />
    </MockedProvider>
  );

  wrapper.find({ "datatestid": 'btnAdd'}).simulate('click');
  expect(wrapper.contains(<h3 className="text-3xl font-semibold">Add Todo</h3>)).toEqual(true);

  const inputContent = wrapper.find({ name: 'content' });
  inputContent.value = 'Testing';
  expect(inputContent.value).toBe('Testing');

  wrapper.find('[type="submit"]').simulate('click');
  expect(wrapper.find({ "datatestid": "error-test" }).get(0).props.className).toEqual('hidden');
})

it("edit todo", () => {
  const wrapper = mount(
    <MockedProvider mocks={mocks} addTypename={false}>
      <TodoForm todo={ todo } />
    </MockedProvider>
  );

  wrapper.find({ "datatestid": "btnEdit"}).simulate('click');
  expect(wrapper.contains(<h3 className="text-3xl font-semibold">Edit Todo</h3>)).toEqual(true);

  const inputContent = wrapper.find({ name: 'content' });
  inputContent.value = 'Edit Testing';
  expect(inputContent.value).toBe('Edit Testing');

  wrapper.find('[type="submit"]').simulate('click');
  expect(wrapper.find({ "datatestid": "error-test" }).get(0).props.className).toEqual('hidden');
})

it("delete todo", () => {
  const wrapper = mount(
    <MockedProvider mocks={mocks} addTypename={false}>
      <DeleteTodo id="4f69c69a-5145-450a-9a68-51817925ef66" />
    </MockedProvider>
  );

  wrapper.find({ "datatestid": "deleteToggle"}).simulate('click');
  wrapper.find({ "datatestid": "btnDelete"}).simulate('click');

  expect(wrapper.find({ "datatestid": "modal-test" }).exists()).toEqual(false);
})