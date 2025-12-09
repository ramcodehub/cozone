import { insertKnowledgeEntry, searchKnowledgeByCategory, searchKnowledgeByKeywords, insertChatbotLog, getRecentLogs } from './services/chatbotService.js';

async function testChatbotService() {
  try {
    console.log('Testing chatbot service...\n');

    // Test inserting a knowledge entry
    console.log('1. Testing knowledge entry insertion...');
    const knowledgeEntry = {
      category: 'test',
      title: 'Test Entry',
      keywords: ['test', 'example'],
      description: 'This is a test knowledge base entry.'
    };
    
    const insertedKnowledge = await insertKnowledgeEntry(knowledgeEntry);
    console.log('   Inserted knowledge entry:', insertedKnowledge.id);
    
    // Test searching by category
    console.log('\n2. Testing knowledge search by category...');
    const categoryResults = await searchKnowledgeByCategory('test');
    console.log('   Found', categoryResults.length, 'entries in "test" category');
    
    // Test searching by keywords
    console.log('\n3. Testing knowledge search by keywords...');
    const keywordResults = await searchKnowledgeByKeywords(['test']);
    console.log('   Found', keywordResults.length, 'entries matching "test" keyword');
    
    // Test inserting a chatbot log
    console.log('\n4. Testing chatbot log insertion...');
    const logEntry = {
      user_query: 'What are your services?',
      bot_response: 'We offer dedicated desks, private cabins, and more.',
      matched_category: 'services',
      source: 'knowledge_base',
      match_score: 0.95,
      response_source: 'gemini'
    };
    
    const insertedLog = await insertChatbotLog(logEntry);
    console.log('   Inserted log entry:', insertedLog.id);
    
    // Test getting recent logs
    console.log('\n5. Testing recent logs retrieval...');
    const recentLogs = await getRecentLogs(5);
    console.log('   Retrieved', recentLogs.length, 'recent log entries');
    
    console.log('\n✅ All chatbot service tests passed!');
  } catch (error) {
    console.error('❌ Error testing chatbot service:', error);
  }
}

// Run the test
testChatbotService();