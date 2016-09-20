import { LupaPage } from './app.po';

describe('lupa App', function() {
  let page: LupaPage;

  beforeEach(() => {
    page = new LupaPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
