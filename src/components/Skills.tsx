
import { motion } from 'framer-motion';

const Skills = () => {
  const skills = [
    { name: 'C/C++', level: 90, color: 'from-blue-500 to-blue-600' },
    { name: 'JavaScript', level: 85, color: 'from-yellow-400 to-yellow-500' },
    { name: 'Java', level: 80, color: 'from-red-500 to-red-600' },
    { name: 'C#', level: 75, color: 'from-purple-500 to-purple-600' },
    { name: 'Assembly x86', level: 70, color: 'from-green-500 to-green-600' },
  ];

  return (
    <section className="py-20 px-6">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold gradient-text mb-4">Technical Skills</h2>
          <p className="text-muted-foreground text-lg">
            Languages and technologies I work with
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-lg font-mono">{skill.name}</h3>
                <span className="text-primary font-bold">{skill.level}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                <motion.div
                  className={`h-full bg-gradient-to-r ${skill.color} rounded-full`}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
                  viewport={{ once: true }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
