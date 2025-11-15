// Types for Todo items
export type TodoStatus = 'pending' | 'in-process' | 'completed';

// Interface representing a Todo item
export interface Todo {
  id: string;                    
  title: string;                 
  description?: string;          
  completed: boolean;            
  status?: TodoStatus;           
  createdAt: number;             
  dueDate: string;               
  reminderValue: number;         
  reminderUnit: 'hours' | 'days';  
  alertShown?: boolean;          
}