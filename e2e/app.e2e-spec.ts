import { BowlingAppPage } from './app.po';

describe('bowling-app App', function() {
  let page: BowlingAppPage;

  beforeEach(() => {
    page = new BowlingAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
