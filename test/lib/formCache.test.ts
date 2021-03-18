import { objectContaining } from "expect/build/asymmetricMatchers";
import { v4 as uuidv4 } from "uuid";
import {
  CacheEntry,
  FormCacheFactory,
  IFormCache,
} from "../../src/lib/formCache";
import { Registration } from "../../src/lib/model/registration.model";

describe("FormCache", () => {
  let cache: IFormCache;
  let id: string;

  const emptyCache = {
    registration: expect.any(Registration),
  };

  beforeEach(() => {
    cache = FormCacheFactory.getCache();
    id = uuidv4();
  });

  it("should return a singleton instance of the form cache", () => {
    const secondInstance: IFormCache = FormCacheFactory.getCache();
    expect(cache).toBe(secondInstance);
  });

  it("should return an empty object for an unknown cache entry", () => {
    expect(cache.get(uuidv4())).toStrictEqual({});
  });

  it("should handle null form data", () => {
    cache.update(id, null);
    expect(cache.get(id)).toStrictEqual(emptyCache);
  });

  it("should handle undefined form data", () => {
    cache.update(id, void 0);
    expect(cache.get(id)).toStrictEqual(emptyCache);
  });

  it("should set the cache for the given id", () => {
    const formData: CacheEntry = { manufacturer: "ASOS" };
    cache.update(id, formData);

    expect(cache.get(id)).toStrictEqual(objectContaining(formData));
  });

  it("should update the cache object with the provided updated value", () => {
    const formData: CacheEntry = { manufacturer: "ASOS" };
    cache.update(id, formData);

    const updatedFormData: CacheEntry = { manufacturer: "TOPSHOP" };
    cache.update(id, updatedFormData);

    expect(cache.get(id)).toStrictEqual(objectContaining(updatedFormData));
  });

  it("should only update the provided form fields", () => {
    const formData: CacheEntry = { manufacturer: "ASOS" };
    cache.update(id, formData);

    const updatedFormData: CacheEntry = { model: "TROUSERS" };
    cache.update(id, updatedFormData);

    expect(cache.get(id)).toStrictEqual(
      objectContaining({
        manufacturer: "ASOS",
        model: "TROUSERS",
      })
    );
  });

  it("should update the overriding form field and add additional fields", () => {
    const formData: CacheEntry = { manufacturer: "ASOS" };
    cache.update(id, formData);

    const updatedFormData: CacheEntry = {
      manufacturer: "TOPSHOP",
      model: "TROUSERS",
    };
    cache.update(id, updatedFormData);

    expect(cache.get(id)).toStrictEqual(objectContaining(updatedFormData));
  });

  describe("with Registration object", () => {
    it("should save beacon data to the Registration", () => {
      const formData: CacheEntry = {
        manufacturer: "Raleigh",
        model: "Chopper",
      };
      cache.update(id, {});
      cache.get(id).registration.addBeacon(formData);

      expect(cache.get(id).registration.beacon(1)).toStrictEqual(formData);
    });

    it("should allow updating of beacon data to the Registration", () => {
      cache.update(id, {});
      const formData: CacheEntry = {
        manufacturer: "Raleigh",
        model: "Chopper",
      };
      cache.get(id).registration.addBeacon(formData);
      const moreFormData: CacheEntry = {
        hexId: "1D0EA08C52FFBFF",
      };
      cache.get(id).registration.updateBeacon(1, moreFormData);

      expect(cache.get(id).registration.beacon(1)).toStrictEqual({
        ...formData,
        ...moreFormData,
      });
    });
  });
});
