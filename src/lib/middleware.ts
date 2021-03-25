/* eslint-disable @typescript-eslint/no-explicit-any */
import { CookieSerializeOptions, serialize } from "cookie";
import { IncomingHttpHeaders, IncomingMessage, ServerResponse } from "http";
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next";
import { NextApiRequestCookies } from "next/dist/next-server/server/api-utils";
import parse from "urlencoded-body-parser";
import { v4 as uuidv4 } from "uuid";
import { CacheEntry, FormCacheFactory, IFormCache } from "./formCache";
import { Registration } from "./registration/registration";
import { formSubmissionCookieId } from "./types";
import { toArray } from "./utils";

export function withCookieRedirect<T>(callback: GetServerSideProps<T>) {
  return async (
    context: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<T>> => {
    const cookies: NextApiRequestCookies = context.req.cookies;

    if (!cookies || !cookies[formSubmissionCookieId]) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }

    return callback(context);
  };
}

export const setFormSubmissionCookie = (
  context: GetServerSidePropsContext
): void => {
  const cookies: NextApiRequestCookies = context.req.cookies;

  if (!cookies || !cookies[formSubmissionCookieId]) {
    const id: string = uuidv4();

    seedCache(id);
    setCookieHeader(id, context.res);
  }
};

export const checkHeaderContains = (
  request: IncomingMessage,
  header: keyof IncomingHttpHeaders,
  value: string
): boolean => {
  const headerValues: string[] = toArray(request.headers[header]);
  return (
    headerValues.length > 0 &&
    !!headerValues.find((headerValue) => headerValue.includes(value))
  );
};

const seedCache = (id: string): void => {
  const cache: IFormCache = FormCacheFactory.getCache();
  cache.update(id);
};

const setCookieHeader = (id: string, res: ServerResponse): void => {
  const options: CookieSerializeOptions = {
    path: "/",
    httpOnly: true,
    sameSite: true,
  };

  res.setHeader("Set-Cookie", serialize(formSubmissionCookieId, id, options));
};

export function updateFormCache(
  cookies: NextApiRequestCookies,
  formData: CacheEntry,
  cache: IFormCache = FormCacheFactory.getCache()
): void {
  const submissionId: string = cookies[formSubmissionCookieId];
  cache.update(submissionId, formData);
}

export async function parseFormData(
  request: IncomingMessage
): Promise<Record<string, any>> {
  return await parse(request);
}

export const getCache = (
  id: string,
  cache: IFormCache = FormCacheFactory.getCache()
): Registration => {
  return cache.get(id);
};
