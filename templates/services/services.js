export function strapService(name) {
  return `import { Service } from '../../commons';
import { Repository } from './repository';

class ${name}Service extends Service {
  private readonly repository: Repository;

  constructor(name: string) {
    super(name);
    this.repository = new Repository();
  }
}

export default new ${name}Service('${name}Service');
`;
}
