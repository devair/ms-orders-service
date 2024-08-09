export interface IOrderQueueAdapterOUT {
 
    publish(queue: string, message: string): Promise<void>
    
}