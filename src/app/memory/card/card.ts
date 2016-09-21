
export class Card {
  public id:number
  public label: string;
  public image: string;
  public audio: string;
}

export class CardState
{
    static Opened = "opened";
    static Closed = "closed";
    static Active = "active";
    static Played = "played";
}


