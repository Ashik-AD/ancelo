/**
 * @TODO:
 * -> there's error is ignored because of comparing possible non-existence property
 */

export class QueueRecent<T> {
  private list: T[];
  private static MAX_SIZE = 20;

  constructor() {
    this.list = [];
  }

  public enqueue(item: T) {
    if (!item) {
      throw new Error('Empty parameter provide');
    }

    if (this.list.length > QueueRecent.MAX_SIZE) {
      // remove 1st item (which is old)
      // push new item to the end of the queue
      this.dequeue();
    }
    // im here being optimistic bcz idk whether item have id or not :)
    const duplicateItemIndex = this.list.findIndex(
      //@ts-ignore
      (ls: any) => ls['id'] === item['id']
    );
    if (duplicateItemIndex != -1) {
      this.list.splice(duplicateItemIndex, 1);
    }
    const newList = this.list.concat([item]);
    this.list = newList;
    return item;
  }

  public dequeue() {
    if (this.list.length <= 0) {
      throw new Error("Can't remove from empty queue");
    }

    const copyList = [...this.list];
    const dequeuedItem = copyList.splice(0, 1);
    this.list = copyList;
    return dequeuedItem;
  }

  public getList(): T[] {
    return this.list.reverse();
  }
}
