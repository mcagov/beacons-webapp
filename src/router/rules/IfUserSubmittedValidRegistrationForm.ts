import { GetServerSidePropsResult } from "next";
import { isValid } from "../../lib/form/lib";
import { FormManagerFactory } from "../../lib/handlePageRequest";
import { BeaconsGetServerSidePropsContext } from "../../lib/middleware/BeaconsGetServerSidePropsContext";
import { redirectUserTo } from "../../lib/redirectUserTo";
import { draftRegistrationId as id } from "../../lib/types";
import { PageURLs } from "../../lib/urls";
import { RegistrationFormMapper } from "../../presenters/RegistrationFormMapper";
import { Rule } from "./Rule";

export class IfUserSubmittedValidRegistrationForm<T> implements Rule {
  protected readonly context: BeaconsGetServerSidePropsContext;
  protected readonly validationRules: FormManagerFactory;
  protected readonly mapper: RegistrationFormMapper<T>;
  private readonly nextPage: PageURLs | Promise<PageURLs>;

  constructor(
    context: BeaconsGetServerSidePropsContext,
    validationRules: FormManagerFactory,
    mapper: RegistrationFormMapper<T>,
    nextPage: PageURLs | Promise<PageURLs>
  ) {
    this.context = context;
    this.validationRules = validationRules;
    this.mapper = mapper;
    this.nextPage = nextPage;
  }

  public async condition(): Promise<boolean> {
    const form = await this.context.container.parseFormDataAs(this.context.req);

    return (
      this.context.req.method === "POST" &&
      isValid<T>(
        this.mapper.toForm(this.mapper.toDraftRegistration(form as T)),
        this.validationRules
      )
    );
  }

  public async action(): Promise<GetServerSidePropsResult<any>> {
    const form = await this.context.container.parseFormDataAs(this.context.req);

    await this.context.container.saveDraftRegistration(
      id(this.context),
      this.mapper.toDraftRegistration(form as T)
    );

    return redirectUserTo(await this.nextPage);
  }
}