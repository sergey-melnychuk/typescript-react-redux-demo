import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from '@testing-library/react';
import axios from 'axios';

import App from './App';
import { Employee } from "./typings";

let container: HTMLDivElement | null;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container!);
  container!.remove();
  container = null;
});

const employee: Employee = {
  "id": 824432449,
  "nationality": "IT",
  "keycardId": "62d12182-0238-4a05-8e16-d50481e0d757",
  "account": "IT18 S070 0208 4764 7427 843A A9V",
  "salary": 7879,
  "office": ["Roma", "Italy"],
  "departmentId": 2,
  "firstName": "Jole",
  "lastName": "Riva",
  "title": "Senior Big Data Developer",
  "contractType": "permanent",
  "email": "jori@softix.com",
  "hiredAt": "1998-07-19",
  "expiresAt": "2018-06-24",
  "personalInfo": {
    "age": 46,
    "phone": "1-570-711-1161 x99751",
    "email": "Jole.Riva@hotmail.com",
    "address": {
      "street": "672 Strosin Creek",
      "city": "Littel borough",
      "country": "Lao People's Democratic Republic"
    },
    "dateOfBirth": "1972-07-30"
  },
  "skills": ["JavaScript", "Angular", "AngularJS", "jQuery", "CSS", "HTML"],
  "bio": "Maiores adipisci odit reiciendis incidunt ipsa.\nQuis vel provident veniam libero deserunt.\n",
  "imgURL": "celebrity-albert-einstein-scientist-physicist.png"
}

describe("App", () => {

  test('renders without crashing', async () => {
    const result: string = '{}';

    const mock = jest.spyOn(axios, 'get');
    mock.mockReturnValueOnce(Promise.resolve({ data: [employee] }));

    await act(async () => {
      render(<App />, container!);
    });
  
    expect(container!.getElementsByTagName('li')[0].getElementsByTagName('span')[0].textContent)
      .toEqual("Jole Riva earns 7879")

    expect(container!.getElementsByTagName('li')[0].getElementsByTagName('span')[0].style.color)
      .toEqual("black")
  });

/*
  test('highlights employee in red', async () => {
    const result: string = '{}';

    const mock = jest.spyOn(axios, 'get');
    mock.mockReturnValueOnce(Promise.resolve({ data: [employee] }));

    await act(async () => {
      render(<App />, container!);
      container!.getElementsByTagName('button')[0].click()
    });

    expect(container!.getElementsByTagName('li')[0].getElementsByTagName('span')[0].textContent)
      .toEqual("Jole Riva earns 7879")

    await act(async () => {
      expect(container!.getElementsByTagName('li')[0].getElementsByTagName('span')[0].style.color)
        .toEqual("red")
    })
  });
*/

})
