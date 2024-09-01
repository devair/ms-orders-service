import { Request, Response, NextFunction } from 'express';
import xss from 'xss';

// Configuração do XSS com opções personalizadas
const xssOptions = {
  whiteList: {
    // Defina tags e atributos permitidos aqui, se necessário
    // Exemplo: a tag <a> e atributos href e title
    a: ['href', 'title'],
    // ... adicione outras tags e atributos permitidos
  },
  stripIgnoreTag: true, // Remove tags não permitidas
  stripIgnoreTagBody: true // Remove o corpo das tags não permitidas
};

const sanitizeJsonBody = (req: Request, res: Response, next: NextFunction) => {
  if (req.body) {
    const sanitizeValue = (value: any): any => {
      if (typeof value === 'string') {
        value = xss(value, xssOptions)
        return value.replace(/[\0\x08\x09\x1a\n\r"'\\\b\f]/g, '\\$&')
                .replace(/(--)|(\b(SELECT|UPDATE|DELETE|INSERT|TRUNCATE|DROP|CREATE|ALTER|MERGE)\b)|(\b(OR|AND|NOT)\b)/gi, '')
      } else if (Array.isArray(value)) {
        return value.map(item => sanitizeValue(item));
      } else if (typeof value === 'object' && value !== null) {
        const sanitizedObj: any = {};
        for (const key in value) {
          if (value.hasOwnProperty(key)) {
            sanitizedObj[key] = sanitizeValue(value[key]);
          }
        }
        return sanitizedObj;
      }
      return value;
    };

    req.body = sanitizeValue(req.body);
  }
  next();
};

export default sanitizeJsonBody;