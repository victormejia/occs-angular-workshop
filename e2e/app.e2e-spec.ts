import { OccsAngularWorkshopPage } from './app.po';

describe('occs-angular-workshop App', () => {
  let page: OccsAngularWorkshopPage;

  beforeEach(() => {
    page = new OccsAngularWorkshopPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
