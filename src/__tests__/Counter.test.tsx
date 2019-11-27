// https://www.valentinog.com/blog/testing-react/
// https://www.pluralsight.com/guides/how-to-test-react-components-in-typescript

import React from "react";
import { render, fireEvent } from "@testing-library/react";

import Counter from '../shared/counter/Counter';

describe("Counter", () => {
    test("should display init value when started", async () => {
        const renderResult = render(<Counter initial={42} />)
        const span = renderResult.getByTestId('count')
        expect(span.textContent).toEqual('42')
    });

    test("should increment the counter", async () => {
        const renderResult = render(<Counter initial={42} />)
        const button = renderResult.getByTestId('inc')
        fireEvent.click(button)
        const span = renderResult.getByTestId('count')
        expect(span.textContent).toEqual('43')
    });

    test("should decrement the counter", async () => {
        const renderResult = render(<Counter initial={42} />)
        const button = renderResult.getByTestId('dec')
        fireEvent.click(button)
        const span = renderResult.getByTestId('count')
        expect(span.textContent).toEqual('41')
    });
})
