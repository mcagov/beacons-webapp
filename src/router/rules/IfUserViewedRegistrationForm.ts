import { GetServerSidePropsResult } from "next";
import { DraftRegistration } from "../../entities/DraftRegistration";
import { withoutErrorMessages } from "../../lib/form/lib";
import { FormManagerFactory } from "../../lib/handlePageRequest";
import { BeaconsGetServerSidePropsContext } from "../../lib/middleware/BeaconsGetServerSidePropsContext";
import { acceptRejectCookieId, formSubmissionCookieId } from "../../lib/types";
import { RegistrationFormMapper } from "../../presenters/RegistrationFormMapper";
import { Rule } from "./Rule";

export class IfUserViewedRegistrationForm<T> implements Rule {
  private readonly context: BeaconsGetServerSidePropsContext;
  private readonly validationRules: FormManagerFactory;
  private readonly mapper: RegistrationFormMapper<T>;
  private readonly additionalProps: Record<string, any>;

  constructor(
    context: BeaconsGetServerSidePropsContext,
    validationRules: FormManagerFactory,
    mapper: RegistrationFormMapper<T>,
    additionalProps?: Record<string, any>
  ) {
    this.context = context;
    this.validationRules = validationRules;
    this.mapper = mapper;
    this.additionalProps = additionalProps;
  }

  public async condition(): Promise<boolean> {
    return this.isHttpGetRequest();
  }

  public async action(): Promise<GetServerSidePropsResult<any>> {
    return await this.showFormWithoutErrors();
  }

  private isHttpGetRequest(): boolean {
    return this.context.req.method === "GET";
  }

  private async showFormWithoutErrors(): Promise<
    GetServerSidePropsResult<any>
  > {
    return {
      props: {
        form: withoutErrorMessages<T>(
          this.mapper.toForm(await this.draftRegistration()),
          this.validationRules
        ),
        showCookieBanner:
          this.context.req.cookies[acceptRejectCookieId] || true,
        ...(await this.additionalProps),
      },
    };
  }

  private async draftRegistration(): Promise<DraftRegistration> {
    return await this.context.container.getDraftRegistration(
      this.draftRegistrationId()
    );
  }

  private draftRegistrationId(): string {
    return this.context.req.cookies[formSubmissionCookieId];
  }
}