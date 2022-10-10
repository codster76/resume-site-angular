export class TrieNode {
    nodeList: TrieNode[] = new Array(26);
    flag = false;
  
    containsKey(character: string) {
      if (this.nodeList[character.charCodeAt(0) - 'a'.charCodeAt(0)]) {
        return true;
      } else {
        return false;
      }
    }
  
    get(character: string) {
      return this.nodeList[character.charCodeAt(0) - 'a'.charCodeAt(0)];
    }
  
    put(character: string, trieNode: TrieNode) {
      this.nodeList[character.charCodeAt(0) - 'a'.charCodeAt(0)] = trieNode;
    }
  
    setEnd() {
      this.flag = true;
    }
  
    isEnd() {
      return this.flag;
    }
  
    printNodeList() {
      for (const node of this.nodeList) {
        if (node) {
          console.log(
            String.fromCharCode(this.nodeList.indexOf(node) + 'a'.charCodeAt(0))
          );
        }
      }
    }
  }
  