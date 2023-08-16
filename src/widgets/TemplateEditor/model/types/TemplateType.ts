export interface ItemTemplateType {
  value: string;
  next?: TemplateType[];
}
export interface TemplateType {
  IF?: ItemTemplateType;
  THEN?: ItemTemplateType;
  ELSE?: ItemTemplateType;
  AFTER?: ItemTemplateType;
}
