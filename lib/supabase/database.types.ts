export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      conversas: {
        Row: {
          created_at: string | null
          exercicio_id: string | null
          id: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          exercicio_id?: string | null
          id?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          exercicio_id?: string | null
          id?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "conversas_exercicio_id_fkey"
            columns: ["exercicio_id"]
            isOneToOne: false
            referencedRelation: "exercicios"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "conversas_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      exercicios: {
        Row: {
          created_at: string | null
          descricao: string
          erros_comuns: string[] | null
          exemplos: string | null
          id: string
          linguagem: string
          modulo: string
          nivel: string
          objetivo: string
          permitidos: string[] | null
          proibidos: string[] | null
          titulo: string
        }
        Insert: {
          created_at?: string | null
          descricao: string
          erros_comuns?: string[] | null
          exemplos?: string | null
          id?: string
          linguagem: string
          modulo: string
          nivel: string
          objetivo: string
          permitidos?: string[] | null
          proibidos?: string[] | null
          titulo: string
        }
        Update: {
          created_at?: string | null
          descricao?: string
          erros_comuns?: string[] | null
          exemplos?: string | null
          id?: string
          linguagem?: string
          modulo?: string
          nivel?: string
          objetivo?: string
          permitidos?: string[] | null
          proibidos?: string[] | null
          titulo?: string
        }
        Relationships: []
      }
      mensagens: {
        Row: {
          conteudo: string
          conversa_id: string | null
          created_at: string | null
          id: string
          role: string
        }
        Insert: {
          conteudo: string
          conversa_id?: string | null
          created_at?: string | null
          id?: string
          role: string
        }
        Update: {
          conteudo?: string
          conversa_id?: string | null
          created_at?: string | null
          id?: string
          role?: string
        }
        Relationships: [
          {
            foreignKeyName: "mensagens_conversa_id_fkey"
            columns: ["conversa_id"]
            isOneToOne: false
            referencedRelation: "conversas"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          assinante: boolean
          created_at: string | null
          email: string
          id: string
          nome: string
          sessoes_gratis_usadas: number
        }
        Insert: {
          assinante?: boolean
          created_at?: string | null
          email: string
          id?: string
          nome: string
          sessoes_gratis_usadas?: number
        }
        Update: {
          assinante?: boolean
          created_at?: string | null
          email?: string
          id?: string
          nome?: string
          sessoes_gratis_usadas?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
