import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import reducer from "./auth";
import * as actionTypes from "../actions/actionTypes";

configure({ adapter: new Adapter() });

describe("auth reducer", () => {
  it("should return initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      token: null,
      userId: null,
      loading: false,
      error: null,
      redirectAuthUrl: "/",
    });
  });

  it("should store the token and userId on auth success", () => {
    expect(
      reducer(
        {
          token: null,
          userId: null,
          loading: false,
          error: null,
          redirectAuthUrl: "/",
        },
        {
          type: actionTypes.AUTH_SUCCESS,
          tokenId: "some-token-id",
          userId: "some-user-id",
        }
      )
    ).toEqual({
      token: "some-token-id",
      userId: "some-user-id",
      loading: false,
      error: null,
      redirectAuthUrl: "/",
    });
  });
});
