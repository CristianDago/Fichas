import React, { ReactNode } from 'react';
import css from '../../../../assets/styles/components/form.section.module.scss';

interface FormSectionProps {
  title: string;
  children: ReactNode;
  gridClassName?: string;
  sectionCssClass?: string;
}

export const FormSection: React.FC<FormSectionProps> = ({ title, children, gridClassName, sectionCssClass }) => {
  return (
    <section className={`${css.formSection} ${sectionCssClass || ''}`}>
      <h2>{title}</h2>
      <div className={`grid ${gridClassName || ''}`}>
        {children}
      </div>
    </section>
  );
};