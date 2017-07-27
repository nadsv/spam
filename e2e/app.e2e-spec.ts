import { SpamPage } from './app.po';

describe('spam App', () => {
  let page: SpamPage;

  beforeEach(() => {
    page = new SpamPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
