import { Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class OperationLogs {
    @Column({ name: 'created_by', select: false })
    public createdBy?: number;

    @Column({ name: 'modified_by', select: false })
    public modifiedBy?: number;

    @CreateDateColumn({ name: 'created_at', select: false })
    public createdAt?: number;

    @UpdateDateColumn({ name: 'modified_at', select: false })
    public modifiedAt?: number;
}
